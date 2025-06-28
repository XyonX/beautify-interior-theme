import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Currency formatting utility
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatPrice = (amount) => {
  // For Indian currency, we can also use a simpler format
  return `₹${amount.toLocaleString("en-IN")}`;
};

// Sanitize HTML content for safe rendering
export function sanitizeHtml(html) {
  if (typeof window !== 'undefined') {
    // Client-side sanitization
    const DOMPurify = require('dompurify');
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'del',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li',
        'blockquote', 'pre', 'code',
        'a', 'img',
        'div', 'span'
      ],
      ALLOWED_ATTR: [
        'href', 'src', 'alt', 'title', 'target',
        'style', 'class', 'id'
      ]
    });
  }
  // Server-side fallback - basic sanitization
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
}
