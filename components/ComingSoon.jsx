"use client";
import { useState } from "react";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate subscription (replace with actual API call in production)
    setMessage("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <div className="h-full w-full bg-amber-50 flex items-center justify-center relative">
      <h1>Coming Soon</h1>
    </div>
  );
}
