"use client";

import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";

export function HeaderCartCount() {
  const [mounted, setMounted] = useState(false);
  const count = useCartStore((state) => state.getCartCount());

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted || count === 0) return null;

  return (
    <span className="absolute -top-1 -right-2 bg-orange text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-in zoom-in">
      {count}
    </span>
  );
}
