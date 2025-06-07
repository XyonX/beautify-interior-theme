"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ComingSoonPage() {
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
    <div className="h-full w-full bg-black">
      {/* Header */}
      <header className="w-full py-4 px-4">
        <div className="container mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-stone-800 rounded-sm flex items-center justify-center">
              <span className="text-white font-medium text-sm">BI</span>
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
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="container max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-medium text-stone-800 mb-2">
                  Coming Soon
                </h2>
                <p className="text-sm text-stone-600">
                  We're working hard to bring you a beautiful shopping
                  experience. Our website is under construction, but we're
                  launching soon.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-stone-800 font-medium">
                  Get notified when we launch:
                </p>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-8 text-xs rounded-sm"
                  />
                  <Button
                    type="submit"
                    className="bg-stone-800 hover:bg-stone-700 h-8 text-xs rounded-sm"
                  >
                    Notify Me
                  </Button>
                </form>
              </div>

              <div className="pt-4">
                <p className="text-xs text-stone-600 mb-3">
                  Follow us for updates:
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-8 h-8 rounded-sm bg-stone-100 flex items-center justify-center text-stone-800 hover:bg-stone-200 transition-colors"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-sm bg-stone-100 flex items-center justify-center text-stone-800 hover:bg-stone-200 transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-sm bg-stone-100 flex items-center justify-center text-stone-800 hover:bg-stone-200 transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:hello@beautifyinterior.com"
                    className="w-8 h-8 rounded-sm bg-stone-100 flex items-center justify-center text-stone-800 hover:bg-stone-200 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="relative aspect-square md:aspect-auto md:h-full">
              <Image
                src="/placeholder.svg?height=500&width=500"
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
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-stone-500">
              © 2024 BeautifyInterior. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a
                href="mailto:hello@beautifyinterior.com"
                className="text-xs text-stone-500 hover:text-stone-800"
              >
                Contact Us
              </a>
              <span className="text-xs text-stone-500">|</span>
              <p className="text-xs text-stone-500">Launching Soon</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
