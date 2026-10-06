"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu, User, BookOpen } from "lucide-react";
import { useState } from "react";
import { HeaderCartCount } from "./HeaderCartCount";

interface MenuLink {
  label: string;
  href: string;
}

export function Header({ menuLinks = [], storeName = "BOUTIQUE" }: { menuLinks?: MenuLink[], storeName?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-ink sticky top-0 z-50 border-b border-white/10">
      <div className="container-page h-20 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-2">
          <div className="w-10 h-10 bg-cyan text-ink rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 font-black" />
          </div>
          <span className="text-white font-heading font-black text-2xl tracking-wide hidden sm:block uppercase">
            {storeName}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {menuLinks.map((link, idx) => (
            <Link key={idx} href={link.href} className="text-white/90 hover:text-cyan font-bold transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search & Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex relative group">
            <input 
              type="text" 
              placeholder={`Rechercher sur ${storeName}...`}
              className="bg-white/10 text-white placeholder-white/50 border border-white/10 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:border-cyan w-[200px] lg:w-[280px] transition-all"
            />
            <Search className="w-5 h-5 text-white/50 absolute right-3 top-1/2 -translate-y-1/2 group-focus-within:text-cyan" />
          </div>

          <Link href="/compte" className="text-white hover:text-cyan p-2 transition-colors relative">
            <User className="w-6 h-6" />
          </Link>
          
          <Link href="/panier" className="text-white hover:text-cyan p-2 transition-colors relative">
            <ShoppingCart className="w-6 h-6" />
            <HeaderCartCount />
          </Link>
        </div>
      </div>
      
      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-ink border-t border-white/10 px-4 py-4 space-y-4">
          <input 
              type="text" 
              placeholder="Rechercher..."
              className="w-full bg-white/10 text-white placeholder-white/50 border border-white/10 rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:border-cyan"
            />
          <div className="flex flex-col gap-4 font-bold text-lg text-white">
            {menuLinks.map((link, idx) => (
              <Link key={idx} href={link.href} onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
