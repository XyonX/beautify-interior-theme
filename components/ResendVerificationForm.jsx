"use client";
import { useState } from "react";

const ResendVerificationForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/resend-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(
          "Verification email sent successfully! Please check your inbox."
        );
        setEmail("");
      } else {
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 md:p-6 rounded-md my-6 text-left mx-4">
      <h3 className="text-base md:text-lg font-medium text-gray-800 mb-3 md:mb-4">
        Request New Verification Email
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-4 md:mb-5">
        Enter your email address below and we'll send you a new verification
        link.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 md:mb-5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-800 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            disabled={isSubmitting}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-md text-sm md:text-base font-sans bg-white transition-colors duration-200 focus:outline-none focus:border-gray-800 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        {message && (
          <div
            className={`p-3 rounded-md mb-4 md:mb-5 text-sm leading-relaxed ${
              message.includes("successfully")
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gray-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-md text-sm md:text-base font-medium tracking-wide cursor-pointer transition-colors duration-200 font-sans hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Verification Email"}
        </button>
      </form>
    </div>
  );
};

export default ResendVerificationForm;
