"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const META_PIXEL_ID = "678127081880146";

// Enhanced Meta Pixel with comprehensive ecommerce tracking
export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Pixel and track page view on route change
    if (typeof window.fbq !== "function") return;

    window.fbq("init", META_PIXEL_ID);
    window.fbq("track", "PageView", {
      page_path: pathname,
    });
  }, [pathname]);

  return (
    <>
      {/* Load Pixel Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
          `,
        }}
      />

      {/* Noscript Fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

// Meta Pixel Event Tracking Functions
export const trackEvent = {
  // Product Engagement
  viewContent: (product) => {
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "ViewContent", {
      content_name: product.name,
      content_category: product.category,
      content_ids: [product.id],
      content_type: "product",
      value: product.price,
      currency: "INR",
    });
  },

  addToWishlist: (product) => {
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "AddToWishlist", {
      content_name: product.name,
      content_category: product.category,
      content_ids: [product.id],
      content_type: "product",
      value: product.price,
      currency: "INR",
    });
  },

  removeFromWishlist: (product) => {
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "RemoveFromWishlist", {
      content_name: product.name,
      content_category: product.category,
      content_ids: [product.id],
      content_type: "product",
      value: product.price,
      currency: "INR",
    });
  },

  addToCart: (product, quantity = 1) => {
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "AddToCart", {
      content_name: product.name,
      content_category: product.category,
      content_ids: [product.id],
      content_type: "product",
      value: product.price * quantity,
      currency: "INR",
      num_items: quantity,
    });
  },

  removeFromCart: (product, quantity = 1) => {
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "RemoveFromCart", {
      content_name: product.name,
      content_category: product.category,
      content_ids: [product.id],
      content_type: "product",
      value: product.price * quantity,
      currency: "INR",
      num_items: quantity,
    });
  },

  // Checkout Process
  initiateCheckout: (cartItems, totalValue) => {
    if (typeof window.fbq !== "function") return;
    const content_ids = cartItems.map(item => item.id);
    const content_names = cartItems.map(item => item.name);
    
    window.fbq("track", "InitiateCheckout", {
      content_ids: content_ids,
      content_name: content_names,
      content_type: "product",
      value: totalValue,
      currency: "INR",
      num_items: cartItems.length,
    });
  },

  addPaymentInfo: (paymentMethod, totalValue) => {
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "AddPaymentInfo", {
      content_type: "product",
      value: totalValue,
      currency: "INR",
      payment_method: paymentMethod,
    });
  },

  addShippingInfo: (shippingMethod, totalValue) => {
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "AddShippingInfo", {
      content_type: "product",
      value: totalValue,
      currency: "INR",
      shipping_method: shippingMethod,
    });
  },

  purchase: (orderData) => {
    if (typeof window.fbq !== "function") return;
    const content_ids = orderData.items.map(item => item.id);
    const content_names = orderData.items.map(item => item.name);
    
    window.fbq("track", "Purchase", {
      content_ids: content_ids,
      content_name: content_names,
      content_type: "product",
      value: orderData.total,
      currency: "INR",
      num_items: orderData.items.length,
      order_id: orderData.order_number,
    });
  },

  // User Engagement
  search: (searchTerm) => {
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "Search", {
      search_string: searchTerm,
    });
  },

  viewCategory: (category) => {
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "ViewCategory", {
      content_category: category,
    });
  },

  contact: () => {
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "Contact");
  },

  completeRegistration: () => {
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "CompleteRegistration");
  },

  // Custom Events
  promoCodeApplied: (promoCode, discountValue) => {
    if (typeof window.fbq !== "function") return;
    window.fbq("trackCustom", "PromoCodeApplied", {
      promo_code: promoCode,
      discount_value: discountValue,
      currency: "INR",
    });
  },

  whatsappChat: (product) => {
    if (typeof window.fbq !== "function") return;
    window.fbq("trackCustom", "WhatsAppChat", {
      content_name: product.name,
      content_category: product.category,
      content_ids: [product.id],
      content_type: "product",
      value: product.price,
      currency: "INR",
    });
  },

  stockAlert: (product) => {
    if (typeof window.fbq !== "function") return;
    window.fbq("trackCustom", "StockAlert", {
      content_name: product.name,
      content_category: product.category,
      content_ids: [product.id],
      content_type: "product",
      stock_quantity: product.quantity,
    });
  },

  // Page-specific tracking
  trackPageView: (pagePath) => {
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "PageView", {
      page_path: pagePath,
    });
  },
};
