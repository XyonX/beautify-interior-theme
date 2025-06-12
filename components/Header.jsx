"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

export function Header() {
  const [cartCount] = useState(3);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { href: "/categories/lighting", label: "Lighting" },
    { href: "/categories/decor", label: "Home Decor" },
    { href: "/categories/crafts", label: "Handmade Crafts" },
    { href: "/categories/furniture", label: "Furniture" },
    { href: "/categories/textiles", label: "Textiles" },
    { href: "/sale", label: "Sale" },
  ];

  const accountLinks = [
    { href: "/account", label: "My Account" },
    { href: "/orders", label: "Orders" },
    { href: "/wishlist", label: "Wishlist" },
  ];

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (
        isMobileMenuOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".mobile-menu-trigger")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when menu is ope
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white sticky top-0 z-50">
        {/* Main header */}
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12  ">
                  <img
                    src="/BI.svg"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-medium text-stone-800">
                    BeautifyInterior
                  </h1>
                </div>
              </div>
            </Link>

            {/* Search bar */}
            <div className="flex-1 max-w-md mx-2 hidden md:block">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-4 pr-10 py-1.5 border-stone-200 focus:border-stone-400 focus:ring-stone-400 text-sm rounded-sm"
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1 bg-stone-800 hover:bg-stone-700 rounded-sm h-6 w-6 p-0"
                >
                  <Search className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex rounded-sm"
              >
                <Heart className="h-4 w-4 mr-1" />
                <span className="text-xs">Wishlist</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-sm">
                    <User className="h-4 w-4 mr-1" />
                    <span className="hidden md:inline text-xs">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="text-xs">
                  <DropdownMenuItem>
                    <Link href="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative rounded-sm"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  <span className="hidden md:inline text-xs">Cart</span>
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-stone-800 text-white text-xs h-4 w-4 flex items-center justify-center p-0">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu Trigger */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden rounded-sm mobile-menu-trigger transition-all duration-200 hover:bg-stone-100"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className="relative w-4 h-4">
                  <Menu
                    className={`h-4 w-4 absolute transition-all duration-300 ${
                      isMobileMenuOpen
                        ? "opacity-0 rotate-180 scale-75"
                        : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X
                    className={`h-4 w-4 absolute transition-all duration-300 ${
                      isMobileMenuOpen
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 rotate-180 scale-75"
                    }`}
                  />
                </div>
              </Button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="mt-2 border-t border-stone-100 pt-2 hidden md:block">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-stone-700 hover:text-stone-900 text-xs font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile Search - Below header */}
          <div className="md:hidden mt-2 border-t border-stone-100 pt-2">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-4 pr-10 py-1.5 border-stone-200 focus:border-stone-400 focus:ring-stone-400 text-xs rounded-sm"
              />
              <Button
                size="sm"
                className="absolute right-1 top-1 bg-stone-800 hover:bg-stone-700 rounded-sm h-6 w-6 p-0"
              >
                <Search className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-500 ease-out ${
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop with staggered animation */}
        <div
          className={`fixed inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-md transition-all duration-500 ease-out ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobileMenu}
        />

        {/* Mobile Menu with enhanced animations */}
        <div
          className={`mobile-menu fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-all duration-500 ease-out ${
            isMobileMenuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <div className="flex flex-col h-full relative overflow-hidden">
            {/* Decorative gradient overlay */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-stone-100/50 to-transparent pointer-events-none" />

            {/* Header with enhanced styling */}
            <div className="flex items-center justify-between p-4 border-b border-stone-100 bg-gradient-to-r from-white to-stone-50/30">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-stone-800 rounded-sm flex items-center justify-center">
                  <span className="text-white font-medium text-xs">BI</span>
                </div>
                <h2 className="text-sm font-medium text-stone-800">Menu</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeMobileMenu}
                className="h-8 w-8 p-0 rounded-full hover:bg-stone-100 transition-all duration-200 hover:scale-105"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Menu Content with staggered animations */}
            <div className="flex-1 overflow-y-auto">
              {/* Categories with staggered entrance */}
              <div className="p-4">
                <h3
                  className={`text-xs font-medium text-stone-800 mb-3 uppercase tracking-wider transition-all duration-300 delay-100 ${
                    isMobileMenuOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  Categories
                </h3>
                <nav className="space-y-1">
                  {navigationLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`block py-3 px-4 text-sm text-stone-700 hover:text-stone-900 hover:bg-gradient-to-r hover:from-stone-50 hover:to-stone-100/50 rounded-lg transition-all duration-200 hover:translate-x-1 hover:shadow-sm border border-transparent hover:border-stone-100 ${
                        isMobileMenuOpen
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{
                        transitionDelay: `${150 + index * 50}ms`,
                      }}
                    >
                      <span className="flex items-center justify-between">
                        {link.label}
                        <span className="text-stone-400 transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Account section */}
              <div className="border-t border-stone-100 p-4 bg-gradient-to-r from-stone-50/30 to-transparent">
                <h3
                  className={`text-xs font-medium text-stone-800 mb-3 uppercase tracking-wider transition-all duration-300 delay-300 ${
                    isMobileMenuOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  Account
                </h3>
                <nav className="space-y-1">
                  {accountLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`block py-3 px-4 text-sm text-stone-700 hover:text-stone-900 hover:bg-gradient-to-r hover:from-stone-50 hover:to-stone-100/50 rounded-lg transition-all duration-200 hover:translate-x-1 hover:shadow-sm border border-transparent hover:border-stone-100 ${
                        isMobileMenuOpen
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{
                        transitionDelay: `${350 + index * 50}ms`,
                      }}
                    >
                      <span className="flex items-center justify-between">
                        {link.label}
                        <span className="text-stone-400 transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </Link>
                  ))}
                  <button
                    onClick={closeMobileMenu}
                    className={`block w-full text-left py-3 px-4 text-sm text-stone-700 hover:text-stone-900 hover:bg-gradient-to-r hover:from-stone-50 hover:to-stone-100/50 rounded-lg transition-all duration-200 hover:translate-x-1 hover:shadow-sm border border-transparent hover:border-stone-100 ${
                      isMobileMenuOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{
                      transitionDelay: `${350 + accountLinks.length * 50}ms`,
                    }}
                  >
                    <span className="flex items-center justify-between">
                      Sign Out
                      <span className="text-stone-400 transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </button>
                </nav>
              </div>

              {/* Quick Links section */}
              <div className="border-t border-stone-100 p-4">
                <h3
                  className={`text-xs font-medium text-stone-800 mb-3 uppercase tracking-wider transition-all duration-300 delay-500 ${
                    isMobileMenuOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  Quick Links
                </h3>
                <nav className="space-y-1">
                  {[
                    { href: "/about", label: "About Us" },
                    { href: "/contact", label: "Contact" },
                    { href: "/shipping", label: "Shipping Info" },
                    { href: "/returns", label: "Returns" },
                  ].map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`block py-3 px-4 text-sm text-stone-700 hover:text-stone-900 hover:bg-gradient-to-r hover:from-stone-50 hover:to-stone-100/50 rounded-lg transition-all duration-200 hover:translate-x-1 hover:shadow-sm border border-transparent hover:border-stone-100 ${
                        isMobileMenuOpen
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{
                        transitionDelay: `${550 + index * 50}ms`,
                      }}
                    >
                      <span className="flex items-center justify-between">
                        {link.label}
                        <span className="text-stone-400 transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* Enhanced Footer */}
            <div
              className={`border-t border-stone-100 p-4 bg-gradient-to-r from-stone-50/50 to-white transition-all duration-300 delay-700 ${
                isMobileMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-600">
                  © 2025 BeautifyInterior
                </span>
                <div className="flex items-center gap-2">
                  <Link href="/wishlist" onClick={closeMobileMenu}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-full hover:bg-stone-100 transition-all duration-200 hover:scale-105"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/account" onClick={closeMobileMenu}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-full hover:bg-stone-100 transition-all duration-200 hover:scale-105"
                    >
                      <User className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
