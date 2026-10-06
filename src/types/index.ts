export type CategorySlug =
  | "livres"
  | "fournitures-scolaires"
  | "papeterie"
  | "bureau"
  | "enfants"
  | "arts-creativite"
  | "cadeaux";

export interface Subcategory {
  slug: string;
  name: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Short label used in navigation */
  navLabel: string;
  description: string;
  heroTitle: string;
  heroText: string;
  image: string;
  subcategories: Subcategory[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  subcategory: string;
  brand: string;
  author?: string;
  description: string;
  details?: Record<string, string>;
  price: number;
  compareAtPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  createdAt?: string;
}

export type SortOption = "relevance" | "newest" | "price-asc" | "price-desc" | "bestsellers";

export interface ProductFilters {
  q?: string;
  category?: CategorySlug;
  subcategories?: string[];
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  minRating?: number;
  onSale?: boolean;
  isNew?: boolean;
  sort?: SortOption;
}

export interface CartLine {
  productId: string;
  quantity: number;
}

export type DeliveryMethod = "home" | "office";
export type PaymentMethod = "cod" | "online";

export type OrderStatus =
  | "received"
  | "preparing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface OrderLine {
  productId: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  orderNumber: string;
  createdAt?: string;
  status: OrderStatus;
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
  };
  shipping: {
    address: string;
    city: string;
    wilayaCode: number;
    postalCode?: string;
    method: DeliveryMethod;
  };
  paymentMethod: PaymentMethod;
  lines: OrderLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  history: { status: OrderStatus; date: string }[];
}

export interface Wilaya {
  code: number;
  name: string;
  homeFee: number;
  officeFee: number;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email?: string;
  hours: string;
  mapsQuery: string;
  image: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  wilayaCode: number;
  postalCode?: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}
