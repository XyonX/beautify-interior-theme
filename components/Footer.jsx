import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
          {/* Company Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-stone-800 rounded-sm flex items-center justify-center">
                <span className="text-white font-medium text-xs">BI</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">
                  BeautifyInterior
                </h3>
              </div>
            </div>
            <p className="text-stone-400">
              Transform your space with our curated collection of beautiful home
              decor.
            </p>
            <div className="flex space-x-3">
              <Link
                href="https://www.facebook.com/people/Beautify-Interior/61577328230098/"
                className="text-stone-400 hover:text-white transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.instagram.com/beautifyinterior07/"
                className="text-stone-400 hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white">Shop</h4>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/categories/lighting"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Lighting
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/decor"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Home Decor
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/crafts"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Handmade Crafts
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/furniture"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Furniture
                </Link>
              </li>
              <li>
                <Link
                  href="/sale"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Servic */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white">Customer Service</h4>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/contact"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white">Contact</h4>
            <div className="space-y-1.5">
              <p>100 Netaji Nagar, Vip Nagar</p>
              <p>beautifyinterior@gmail.com</p>
              <p>+91 988-360-88843</p>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-6 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-stone-400 text-xs">
              © 2025 BeautifyInterior. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-3 md:mt-0">
              <Link
                href="/privacy"
                className="text-stone-400 hover:text-white text-xs transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-stone-400 hover:text-white text-xs transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-stone-400 hover:text-white text-xs transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
