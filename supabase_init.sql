-- Create custom types
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE payment_method AS ENUM ('cash_on_delivery', 'online_payment');

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    brand TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL CHECK (price >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    images JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id), -- Can be null for guest checkout
    customer_infos JSONB NOT NULL,
    wilaya TEXT NOT NULL,
    subtotal NUMERIC NOT NULL CHECK (subtotal >= 0),
    delivery_fee NUMERIC NOT NULL CHECK (delivery_fee >= 0),
    total NUMERIC NOT NULL CHECK (total >= 0),
    status order_status NOT NULL DEFAULT 'pending',
    payment_method payment_method NOT NULL DEFAULT 'cash_on_delivery',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC NOT NULL CHECK (unit_price >= 0),
    total_price NUMERIC NOT NULL CHECK (total_price >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Policies for products (Anyone can read, only service_role can write)
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);

-- Policies for orders (Users can only see their own orders)
CREATE POLICY "Users can view their own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
-- Guests cannot read orders via API.

-- Policies for order_items (Users can only see items for their orders)
CREATE POLICY "Users can view their own order items" ON order_items FOR SELECT USING (
    order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
);

-- RPC for secure order creation (bypasses RLS to insert)
CREATE OR REPLACE FUNCTION create_order(
    p_customer JSONB,
    p_address JSONB,
    p_items JSONB
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_order_id UUID;
    v_subtotal NUMERIC := 0;
    v_delivery_fee NUMERIC := 800; -- Hardcoded for mock, could be dynamic
    v_item JSONB;
    v_product_id UUID;
    v_quantity INTEGER;
    v_unit_price NUMERIC;
BEGIN
    -- 1. Create order record
    INSERT INTO orders (
        user_id,
        customer_infos,
        wilaya,
        subtotal,
        delivery_fee,
        total,
        status,
        payment_method
    ) VALUES (
        auth.uid(),
        p_customer,
        p_address->>'wilaya',
        0, -- placeholder, will update later
        v_delivery_fee,
        0, -- placeholder
        'pending',
        'cash_on_delivery'
    ) RETURNING id INTO v_order_id;

    -- 2. Process items securely
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        v_product_id := (v_item->>'product_id')::UUID;
        v_quantity := (v_item->>'quantity')::INTEGER;
        
        IF v_quantity <= 0 THEN
            RAISE EXCEPTION 'Quantity must be greater than 0';
        END IF;

        -- Fetch real price from products table
        SELECT price INTO v_unit_price FROM products WHERE id = v_product_id;
        
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Product % not found', v_product_id;
        END IF;

        -- Insert order item
        INSERT INTO order_items (
            order_id,
            product_id,
            quantity,
            unit_price,
            total_price
        ) VALUES (
            v_order_id,
            v_product_id,
            v_quantity,
            v_unit_price,
            v_unit_price * v_quantity
        );

        -- Add to subtotal
        v_subtotal := v_subtotal + (v_unit_price * v_quantity);
    END LOOP;

    -- 3. Update order with correct totals
    UPDATE orders
    SET subtotal = v_subtotal,
        total = v_subtotal + v_delivery_fee
    WHERE id = v_order_id;

    RETURN v_order_id;
END;
$$;
