"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Upload, Store, Mail, Shield, Palette, Globe, CreditCard } from "lucide-react"

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    // Store Settings
    storeName: "BeautifyInterior",
    storeDescription: "Transform your space with our curated collection of beautiful home decor.",
    storeEmail: "hello@beautifyinterior.com",
    storePhone: "+1 (555) 123-4567",
    storeAddress: "123 Design Street, Creative City, CC 12345",
    currency: "USD",
    timezone: "America/New_York",
    language: "en",

    // Email Settings
    emailNotifications: true,
    orderConfirmationEmail: true,
    lowStockAlerts: true,
    customerNewsletters: true,
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUsername: "",
    smtpPassword: "",

    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordRequirements: true,
    allowGuestCheckout: true,
    requireEmailVerification: true,

    // Appearance Settings
    primaryColor: "#292524",
    secondaryColor: "#78716c",
    accentColor1: "#ea580c",
    accentColor2: "#0891b2",
    accentColor3: "#059669",
    logoUrl: "",
    faviconUrl: "",
    customCSS: "",

    // SEO Settings
    metaTitle: "BeautifyInterior - Transform Your Space",
    metaDescription: "Beautiful home decor and handcrafted items to transform your living space",
    metaKeywords: "home decor, lighting, handmade crafts, interior design",
    googleAnalyticsId: "",
    facebookPixelId: "",

    // Payment Settings
    enableStripe: true,
    enablePayPal: false,
    enableApplePay: false,
    enableGooglePay: false,
    stripePublishableKey: "",
    stripeSecretKey: "",
    paypalClientId: "",

    // Shipping Settings
    freeShippingThreshold: 75,
    defaultShippingRate: 9.99,
    enableLocalDelivery: false,
    enablePickup: false,

    // Tax Settings
    enableTax: true,
    taxRate: 8.5,
    taxIncluded: false,

    // Inventory Settings
    trackInventory: true,
    allowBackorders: false,
    lowStockThreshold: 5,

    // Social Media
    facebookUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    pinterestUrl: "",

    // Legal
    termsOfServiceUrl: "",
    privacyPolicyUrl: "",
    returnPolicyUrl: "",

    // Features
    enableReviews: true,
    enableWishlist: true,
    enableCompareProducts: false,
    enableLiveChat: false,

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  const handleSave = () => {
    // Save settings logic here
    console.log("Saving settings:", settings)
  }

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Settings</h1>
          <p className="text-sm text-stone-600">Manage your store configuration and preferences</p>
        </div>
        <Button onClick={handleSave} className="bg-stone-800 hover:bg-stone-700">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="store" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="store" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            Store
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            SEO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="store" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Store Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    value={settings.storeName}
                    onChange={(e) => handleInputChange("storeName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="storeEmail">Store Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={settings.storeEmail}
                    onChange={(e) => handleInputChange("storeEmail", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="storePhone">Store Phone</Label>
                  <Input
                    id="storePhone"
                    value={settings.storePhone}
                    onChange={(e) => handleInputChange("storePhone", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={settings.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select value={settings.language} onValueChange={(value) => handleInputChange("language", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="storeDescription">Store Description</Label>
                <Textarea
                  id="storeDescription"
                  value={settings.storeDescription}
                  onChange={(e) => handleInputChange("storeDescription", e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="storeAddress">Store Address</Label>
                <Textarea
                  id="storeAddress"
                  value={settings.storeAddress}
                  onChange={(e) => handleInputChange("storeAddress", e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Shipping & Tax</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
                  <Input
                    id="freeShippingThreshold"
                    type="number"
                    step="0.01"
                    value={settings.freeShippingThreshold}
                    onChange={(e) => handleInputChange("freeShippingThreshold", Number.parseFloat(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="defaultShippingRate">Default Shipping Rate ($)</Label>
                  <Input
                    id="defaultShippingRate"
                    type="number"
                    step="0.01"
                    value={settings.defaultShippingRate}
                    onChange={(e) => handleInputChange("defaultShippingRate", Number.parseFloat(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    step="0.01"
                    value={settings.taxRate}
                    onChange={(e) => handleInputChange("taxRate", Number.parseFloat(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                  <Input
                    id="lowStockThreshold"
                    type="number"
                    value={settings.lowStockThreshold}
                    onChange={(e) => handleInputChange("lowStockThreshold", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableTax">Enable Tax</Label>
                    <p className="text-sm text-stone-600">Calculate tax on orders</p>
                  </div>
                  <Switch
                    id="enableTax"
                    checked={settings.enableTax}
                    onCheckedChange={(checked) => handleInputChange("enableTax", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="taxIncluded">Tax Included in Prices</Label>
                    <p className="text-sm text-stone-600">Prices include tax</p>
                  </div>
                  <Switch
                    id="taxIncluded"
                    checked={settings.taxIncluded}
                    onCheckedChange={(checked) => handleInputChange("taxIncluded", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Email Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-stone-600">Receive email notifications for important events</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="orderConfirmationEmail">Order Confirmation Emails</Label>
                  <p className="text-sm text-stone-600">Send confirmation emails to customers</p>
                </div>
                <Switch
                  id="orderConfirmationEmail"
                  checked={settings.orderConfirmationEmail}
                  onCheckedChange={(checked) => handleInputChange("orderConfirmationEmail", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="lowStockAlerts">Low Stock Alerts</Label>
                  <p className="text-sm text-stone-600">Get notified when products are running low</p>
                </div>
                <Switch
                  id="lowStockAlerts"
                  checked={settings.lowStockAlerts}
                  onCheckedChange={(checked) => handleInputChange("lowStockAlerts", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="customerNewsletters">Customer Newsletters</Label>
                  <p className="text-sm text-stone-600">Send newsletters to subscribed customers</p>
                </div>
                <Switch
                  id="customerNewsletters"
                  checked={settings.customerNewsletters}
                  onCheckedChange={(checked) => handleInputChange("customerNewsletters", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">SMTP Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={settings.smtpHost}
                    onChange={(e) => handleInputChange("smtpHost", e.target.value)}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    value={settings.smtpPort}
                    onChange={(e) => handleInputChange("smtpPort", Number.parseInt(e.target.value))}
                    placeholder="587"
                  />
                </div>
                <div>
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    value={settings.smtpUsername}
                    onChange={(e) => handleInputChange("smtpUsername", e.target.value)}
                    placeholder="your-email@gmail.com"
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={settings.smtpPassword}
                    onChange={(e) => handleInputChange("smtpPassword", e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                  <p className="text-sm text-stone-600">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => handleInputChange("twoFactorAuth", checked)}
                />
              </div>
              <div>
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleInputChange("sessionTimeout", Number.parseInt(e.target.value))}
                  className="w-32"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="passwordRequirements">Strong Password Requirements</Label>
                  <p className="text-sm text-stone-600">Enforce strong password policies</p>
                </div>
                <Switch
                  id="passwordRequirements"
                  checked={settings.passwordRequirements}
                  onCheckedChange={(checked) => handleInputChange("passwordRequirements", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allowGuestCheckout">Allow Guest Checkout</Label>
                  <p className="text-sm text-stone-600">Let customers checkout without creating an account</p>
                </div>
                <Switch
                  id="allowGuestCheckout"
                  checked={settings.allowGuestCheckout}
                  onCheckedChange={(checked) => handleInputChange("allowGuestCheckout", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="requireEmailVerification">Require Email Verification</Label>
                  <p className="text-sm text-stone-600">Users must verify their email before accessing their account</p>
                </div>
                <Switch
                  id="requireEmailVerification"
                  checked={settings.requireEmailVerification}
                  onCheckedChange={(checked) => handleInputChange("requireEmailVerification", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Brand & Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => handleInputChange("secondaryColor", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.secondaryColor}
                      onChange={(e) => handleInputChange("secondaryColor", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="accentColor1">Accent Color 1 (Orange)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="accentColor1"
                      type="color"
                      value={settings.accentColor1}
                      onChange={(e) => handleInputChange("accentColor1", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.accentColor1}
                      onChange={(e) => handleInputChange("accentColor1", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="accentColor2">Accent Color 2 (Teal)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="accentColor2"
                      type="color"
                      value={settings.accentColor2}
                      onChange={(e) => handleInputChange("accentColor2", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.accentColor2}
                      onChange={(e) => handleInputChange("accentColor2", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="accentColor3">Accent Color 3 (Green)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="accentColor3"
                      type="color"
                      value={settings.accentColor3}
                      onChange={(e) => handleInputChange("accentColor3", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.accentColor3}
                      onChange={(e) => handleInputChange("accentColor3", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="logoUrl">Logo URL</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="logoUrl"
                    value={settings.logoUrl}
                    onChange={(e) => handleInputChange("logoUrl", e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="faviconUrl">Favicon URL</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="faviconUrl"
                    value={settings.faviconUrl}
                    onChange={(e) => handleInputChange("faviconUrl", e.target.value)}
                    placeholder="https://example.com/favicon.ico"
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="customCSS">Custom CSS</Label>
                <Textarea
                  id="customCSS"
                  value={settings.customCSS}
                  onChange={(e) => handleInputChange("customCSS", e.target.value)}
                  placeholder="/* Custom CSS styles */"
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableStripe">Stripe</Label>
                    <p className="text-sm text-stone-600">Accept credit cards via Stripe</p>
                  </div>
                  <Switch
                    id="enableStripe"
                    checked={settings.enableStripe}
                    onCheckedChange={(checked) => handleInputChange("enableStripe", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enablePayPal">PayPal</Label>
                    <p className="text-sm text-stone-600">Accept PayPal payments</p>
                  </div>
                  <Switch
                    id="enablePayPal"
                    checked={settings.enablePayPal}
                    onCheckedChange={(checked) => handleInputChange("enablePayPal", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableApplePay">Apple Pay</Label>
                    <p className="text-sm text-stone-600">Accept Apple Pay payments</p>
                  </div>
                  <Switch
                    id="enableApplePay"
                    checked={settings.enableApplePay}
                    onCheckedChange={(checked) => handleInputChange("enableApplePay", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableGooglePay">Google Pay</Label>
                    <p className="text-sm text-stone-600">Accept Google Pay payments</p>
                  </div>
                  <Switch
                    id="enableGooglePay"
                    checked={settings.enableGooglePay}
                    onCheckedChange={(checked) => handleInputChange("enableGooglePay", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {settings.enableStripe && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Stripe Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="stripePublishableKey">Stripe Publishable Key</Label>
                  <Input
                    id="stripePublishableKey"
                    value={settings.stripePublishableKey}
                    onChange={(e) => handleInputChange("stripePublishableKey", e.target.value)}
                    placeholder="pk_test_..."
                  />
                </div>
                <div>
                  <Label htmlFor="stripeSecretKey">Stripe Secret Key</Label>
                  <Input
                    id="stripeSecretKey"
                    type="password"
                    value={settings.stripeSecretKey}
                    onChange={(e) => handleInputChange("stripeSecretKey", e.target.value)}
                    placeholder="sk_test_..."
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {settings.enablePayPal && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">PayPal Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="paypalClientId">PayPal Client ID</Label>
                  <Input
                    id="paypalClientId"
                    value={settings.paypalClientId}
                    onChange={(e) => handleInputChange("paypalClientId", e.target.value)}
                    placeholder="PayPal Client ID"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={settings.metaTitle}
                  onChange={(e) => handleInputChange("metaTitle", e.target.value)}
                  placeholder="Your store title for search engines"
                />
                <p className="text-xs text-stone-500 mt-1">{settings.metaTitle.length}/60 characters</p>
              </div>
              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={settings.metaDescription}
                  onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                  placeholder="A brief description of your store for search engines"
                  rows={3}
                />
                <p className="text-xs text-stone-500 mt-1">{settings.metaDescription.length}/160 characters</p>
              </div>
              <div>
                <Label htmlFor="metaKeywords">Meta Keywords</Label>
                <Input
                  id="metaKeywords"
                  value={settings.metaKeywords}
                  onChange={(e) => handleInputChange("metaKeywords", e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                />
                <p className="text-xs text-stone-500 mt-1">Separate keywords with commas</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Analytics & Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                <Input
                  id="googleAnalyticsId"
                  value={settings.googleAnalyticsId}
                  onChange={(e) => handleInputChange("googleAnalyticsId", e.target.value)}
                  placeholder="GA-XXXXXXXXX-X"
                />
              </div>
              <div>
                <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                <Input
                  id="facebookPixelId"
                  value={settings.facebookPixelId}
                  onChange={(e) => handleInputChange("facebookPixelId", e.target.value)}
                  placeholder="Facebook Pixel ID"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Social Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="facebookUrl">Facebook URL</Label>
                  <Input
                    id="facebookUrl"
                    value={settings.facebookUrl}
                    onChange={(e) => handleInputChange("facebookUrl", e.target.value)}
                    placeholder="https://facebook.com/yourstore"
                  />
                </div>
                <div>
                  <Label htmlFor="instagramUrl">Instagram URL</Label>
                  <Input
                    id="instagramUrl"
                    value={settings.instagramUrl}
                    onChange={(e) => handleInputChange("instagramUrl", e.target.value)}
                    placeholder="https://instagram.com/yourstore"
                  />
                </div>
                <div>
                  <Label htmlFor="twitterUrl">Twitter URL</Label>
                  <Input
                    id="twitterUrl"
                    value={settings.twitterUrl}
                    onChange={(e) => handleInputChange("twitterUrl", e.target.value)}
                    placeholder="https://twitter.com/yourstore"
                  />
                </div>
                <div>
                  <Label htmlFor="pinterestUrl">Pinterest URL</Label>
                  <Input
                    id="pinterestUrl"
                    value={settings.pinterestUrl}
                    onChange={(e) => handleInputChange("pinterestUrl", e.target.value)}
                    placeholder="https://pinterest.com/yourstore"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
