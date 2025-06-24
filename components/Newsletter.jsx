"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/newsletter/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, source: "website" }),
        }
      );
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) {
        setEmail(""); // Clear input on success
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <section className="py-8 bg-stone-800">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center text-white">
          <h2 className="text-lg font-medium mb-2">Join Our Newsletter</h2>
          <p className="text-stone-300 text-xs mb-4">
            Get exclusive access to new arrivals and special offers
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto"
          >
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white text-stone-800 border-0 text-xs rounded-sm"
            />
            <Button
              disabled={isLoading}
              className="bg-accent2-600 hover:bg-accent2-700 text-white text-xs rounded-sm"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          {message && <p className="mt-2 text-sm text-white">{message}</p>}
        </div>
      </div>
    </section>
  );
}
