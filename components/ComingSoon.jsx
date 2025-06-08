"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this to your backend or email service
    toast({
      title: "Thank you for subscribing!",
      description: "We'll notify you when we launch.",
    });
    setEmail("");
  };
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-4">
        <div className="container mx-auto">
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
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-8 md:py-12">
        <div className="container max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Content - Full width on mobile, half width on desktop */}
            <div className="space-y-6 text-center md:text-left">
              <div>
                <h2 className="text-2xl md:text-3xl font-medium text-stone-800 mb-3">
                  Coming Soon
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed">
                  We're working hard to bring you a beautiful shopping
                  experience for home decoration items, aesthetic lightings, and
                  handmade craft items. Our website is under construction, but
                  we're launching soon.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-stone-800 font-medium">
                  Get notified when we launch:
                </p>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 text-sm rounded-sm flex-1"
                  />
                  <Button
                    type="submit"
                    className="bg-stone-800 hover:bg-stone-700 h-10 text-sm rounded-sm px-6"
                  >
                    Notify Me
                  </Button>
                </form>
              </div>

              <div className="pt-4">
                <p className="text-xs text-stone-600 mb-3">
                  Follow us for updates:
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-sm bg-stone-100 flex items-center justify-center text-stone-800 hover:bg-stone-200 transition-colors"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <Link
                    href="https://www.instagram.com/beautifyinterior07"
                    target="blank"
                    className="w-10 h-10 rounded-sm bg-stone-100 flex items-center justify-center text-stone-800 hover:bg-stone-200 transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                  </Link>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-sm bg-stone-100 flex items-center justify-center text-stone-800 hover:bg-stone-200 transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:beautifyinterior@gmail.com"
                    className="w-10 h-10 rounded-sm bg-stone-100 flex items-center justify-center text-stone-800 hover:bg-stone-200 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Contact info - visible on mobile */}
              <div className="pt-4 md:hidden">
                <p className="text-xs text-stone-600 mb-2">Contact us:</p>
                <div className="space-y-1">
                  <p className="text-xs text-stone-800">
                    beautifyinterior@gmail.com
                  </p>
                  <p className="text-xs text-stone-800">+91 988-360-8843</p>
                </div>
              </div>
            </div>

            {/* Image - Hidden on mobile, visible on md and up */}
            <div className="hidden md:block relative aspect-square">
              <Image
                src="/logo_transparent.png?height=500&width=500"
                alt="BeautifyInterior Coming Soon"
                fill
                className="object-cover rounded-sm"
                priority
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-4 border-t border-stone-100">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-xs text-stone-500">
              © 2025 BeautifyInterior. All rights reserved.
            </p>
            <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4">
              <a
                href="mailto:hello@beautifyinterior.com"
                className="text-xs text-stone-500 hover:text-stone-800"
              >
                Contact Us
              </a>
              <span className="hidden md:inline text-xs text-stone-500">|</span>
              <p className="text-xs text-stone-500">Launching Soon</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;
