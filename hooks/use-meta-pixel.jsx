"use client";
import { trackEvent } from "@/components/meta-pixel";

export const useMetaPixel = () => {
  return {
    // Product Engagement
    trackViewContent: (product) => {
      trackEvent.viewContent(product);
    },

    trackAddToWishlist: (product) => {
      trackEvent.addToWishlist(product);
    },

    trackRemoveFromWishlist: (product) => {
      trackEvent.removeFromWishlist(product);
    },

    trackAddToCart: (product, quantity = 1) => {
      trackEvent.addToCart(product, quantity);
    },

    trackRemoveFromCart: (product, quantity = 1) => {
      trackEvent.removeFromCart(product, quantity);
    },

    // Checkout Process
    trackInitiateCheckout: (cartItems, totalValue) => {
      trackEvent.initiateCheckout(cartItems, totalValue);
    },

    trackAddPaymentInfo: (paymentMethod, totalValue) => {
      trackEvent.addPaymentInfo(paymentMethod, totalValue);
    },

    trackAddShippingInfo: (shippingMethod, totalValue) => {
      trackEvent.addShippingInfo(shippingMethod, totalValue);
    },

    trackPurchase: (orderData) => {
      trackEvent.purchase(orderData);
    },

    // User Engagement
    trackSearch: (searchTerm) => {
      trackEvent.search(searchTerm);
    },

    trackViewCategory: (category) => {
      trackEvent.viewCategory(category);
    },

    trackContact: () => {
      trackEvent.contact();
    },

    trackCompleteRegistration: () => {
      trackEvent.completeRegistration();
    },

    // Custom Events
    trackPromoCodeApplied: (promoCode, discountValue) => {
      trackEvent.promoCodeApplied(promoCode, discountValue);
    },

    trackWhatsAppChat: (product) => {
      trackEvent.whatsappChat(product);
    },

    trackStockAlert: (product) => {
      trackEvent.stockAlert(product);
    },

    // Page tracking
    trackPageView: (pagePath) => {
      trackEvent.trackPageView(pagePath);
    },
  };
}; 