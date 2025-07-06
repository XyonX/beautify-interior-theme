# Meta Pixel Implementation Guide for BeautifyInterior

## Overview
This guide covers the comprehensive Meta Pixel event tracking implementation for the BeautifyInterior ecommerce app. The implementation includes standard ecommerce events and custom events for better conversion tracking and audience building.

## 🎯 Events Implemented

### 1. **Product Engagement Events**
- ✅ **ViewContent** - Product detail page views
- ✅ **AddToCart** - Items added to cart
- ✅ **RemoveFromCart** - Items removed from cart
- ✅ **AddToWishlist** - Items added to wishlist
- ✅ **RemoveFromWishlist** - Items removed from wishlist

### 2. **Checkout Funnel Events**
- ✅ **InitiateCheckout** - Starting checkout process
- ✅ **AddPaymentInfo** - Payment method selection
- ✅ **AddShippingInfo** - Shipping address entry
- ✅ **Purchase** - Order completion

### 3. **User Engagement Events**
- ✅ **Search** - Product searches
- ✅ **ViewCategory** - Category browsing
- ✅ **Contact** - Customer support contact
- ✅ **CompleteRegistration** - User registration

### 4. **Custom Events**
- ✅ **PromoCodeApplied** - Discount code usage
- ✅ **WhatsAppChat** - WhatsApp support initiation
- ✅ **StockAlert** - Low stock notifications

## 📁 Files Modified/Created

### Core Files
- `components/meta-pixel.jsx` - Enhanced with comprehensive event tracking
- `hooks/use-meta-pixel.jsx` - Custom hook for easy event tracking
- `components/add-to-cart-button.jsx` - Added AddToCart tracking
- `app/(public)/cart/page.jsx` - Added RemoveFromCart and InitiateCheckout tracking
- `app/(public)/checkout/page.jsx` - Added payment and shipping tracking
- `app/(public)/order-confirmation/page.jsx` - Added Purchase tracking
- `components/enhanced-product-action.jsx` - Added WhatsApp chat tracking

### Tracking Components
- `components/product-view-tracker.jsx` - Product view tracking
- `components/category-view-tracker.jsx` - Category view tracking
- `components/search-tracker.jsx` - Search event tracking

## 🚀 Implementation Steps

### Step 1: Add Product View Tracking
Add to product detail pages:
```jsx
import { ProductViewTracker } from "@/components/product-view-tracker";

// In your product detail page component
<ProductViewTracker product={productData} />
```

### Step 2: Add Category View Tracking
Add to category pages:
```jsx
import { CategoryViewTracker } from "@/components/category-view-tracker";

// In your category page component
<CategoryViewTracker category={categoryName} />
```

### Step 3: Add Search Tracking
Update your search functionality:
```jsx
import { SearchTracker } from "@/components/search-tracker";

// In your search component
const { handleSearch } = SearchTracker({ onSearch: yourSearchFunction });
```

### Step 4: Add Wishlist Tracking
Update wishlist functionality:
```jsx
import { useMetaPixel } from "@/hooks/use-meta-pixel";

const { trackAddToWishlist, trackRemoveFromWishlist } = useMetaPixel();

// When adding to wishlist
trackAddToWishlist(product);

// When removing from wishlist
trackRemoveFromWishlist(product);
```

### Step 5: Add Registration Tracking
Update registration success:
```jsx
import { useMetaPixel } from "@/hooks/use-meta-pixel";

const { trackCompleteRegistration } = useMetaPixel();

// After successful registration
trackCompleteRegistration();
```

### Step 6: Add Contact Tracking
Update contact forms:
```jsx
import { useMetaPixel } from "@/hooks/use-meta-pixel";

const { trackContact } = useMetaPixel();

// When contact form is submitted
trackContact();
```

## 📊 Event Data Structure

### Standard Ecommerce Events
```javascript
// AddToCart
{
  content_name: "Product Name",
  content_category: "Category",
  content_ids: ["product_id"],
  content_type: "product",
  value: 999.99,
  currency: "INR",
  num_items: 1
}

// Purchase
{
  content_ids: ["product_id1", "product_id2"],
  content_name: ["Product 1", "Product 2"],
  content_type: "product",
  value: 1999.98,
  currency: "INR",
  num_items: 2,
  order_id: "ORDER123"
}
```

### Custom Events
```javascript
// PromoCodeApplied
{
  promo_code: "SAVE10",
  discount_value: 99.99,
  currency: "INR"
}

// WhatsAppChat
{
  content_name: "Product Name",
  content_category: "Category",
  content_ids: ["product_id"],
  content_type: "product",
  value: 999.99,
  currency: "INR"
}
```

## 🎯 Conversion Optimization

### 1. **Audience Building**
- Use AddToCart events to create "Add to Cart" audiences
- Use ViewContent events to create "Product Viewers" audiences
- Use InitiateCheckout events to create "Checkout Starters" audiences

### 2. **Retargeting Campaigns**
- Retarget cart abandoners with AddToCart events
- Retarget checkout abandoners with InitiateCheckout events
- Retarget product viewers with ViewContent events

### 3. **Lookalike Audiences**
- Create lookalike audiences from Purchase events
- Create lookalike audiences from high-value customers

## 🔧 Testing & Verification

### 1. **Facebook Pixel Helper**
- Install Facebook Pixel Helper browser extension
- Verify events are firing correctly
- Check event parameters are accurate

### 2. **Test Events**
```javascript
// Test in browser console
window.fbq('track', 'AddToCart', {
  content_name: 'Test Product',
  content_category: 'Test Category',
  content_ids: ['test_id'],
  content_type: 'product',
  value: 100,
  currency: 'INR',
  num_items: 1
});
```

### 3. **Event Debugging**
- Check browser console for errors
- Verify Meta Pixel ID is correct
- Ensure events fire at appropriate times

## 📈 Analytics & Reporting

### 1. **Facebook Events Manager**
- Monitor event volume and frequency
- Check for event quality issues
- Verify conversion tracking

### 2. **Key Metrics to Track**
- Conversion rate from AddToCart to Purchase
- Cart abandonment rate
- Checkout abandonment rate
- Product view to cart conversion rate

### 3. **Custom Conversions**
- Set up custom conversions for high-value actions
- Create conversion rules based on event parameters
- Track micro-conversions (wishlist adds, searches)

## 🛠️ Maintenance

### 1. **Regular Checks**
- Verify events are firing on new features
- Check for broken tracking after updates
- Monitor event data quality

### 2. **Updates**
- Keep Meta Pixel code updated
- Add new events as features are added
- Optimize event parameters based on performance

### 3. **Performance Monitoring**
- Monitor page load impact
- Check for tracking conflicts
- Optimize event firing timing

## 🎉 Benefits

1. **Better Ad Targeting** - More precise audience creation
2. **Improved ROAS** - Better conversion tracking and optimization
3. **Enhanced Retargeting** - More effective remarketing campaigns
4. **Data-Driven Decisions** - Better insights into user behavior
5. **Automated Bidding** - Enable Facebook's automated bidding strategies

## 📞 Support

For implementation questions or issues:
1. Check Facebook Pixel documentation
2. Use Facebook Pixel Helper for debugging
3. Review event parameters in Events Manager
4. Test events in development environment first

---

**Note**: This implementation follows Facebook's best practices for ecommerce tracking and is optimized for the BeautifyInterior app structure. 