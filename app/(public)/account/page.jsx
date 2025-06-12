"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Bell,
  CreditCard,
  Package,
  Heart,
  Settings,
  LogOut,
  Edit,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";

export default function AccountPage() {
  const router = useRouter();
  const {
    user,
    logout,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    isLoading,
    error,
    clearError,
  } = useAuthStore();

  const [activeTab, setActiveTab] = useState("profile");
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addingAddress, setAddingAddress] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });

  const [addressData, setAddressData] = useState({
    type: "home",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    isDefault: false,
  });

  useEffect(() => {
    if (!user) {
      router.push("/auth/login?redirect=/account");
      return;
    }

    setProfileData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      dateOfBirth: user.dateOfBirth || "",
    });
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const success = await updateProfile(profileData);
    if (success) {
      setEditingProfile(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    const success = await addAddress(addressData);
    if (success) {
      setAddingAddress(false);
      resetAddressForm();
    }
  };

  const handleUpdateAddress = async (e, addressId) => {
    e.preventDefault();
    const success = await updateAddress(addressId, addressData);
    if (success) {
      setEditingAddress(null);
      resetAddressForm();
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (confirm("Are you sure you want to delete this address?")) {
      await deleteAddress(addressId);
    }
  };

  const resetAddressForm = () => {
    setAddressData({
      type: "home",
      firstName: "",
      lastName: "",
      company: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
      isDefault: false,
    });
  };

  const startEditingAddress = (address) => {
    setAddressData({
      type: address.type,
      firstName: address.firstName,
      lastName: address.lastName,
      company: address.company || "",
      address: address.address,
      address2: address.address2 || "",
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      phone: address.phone || "",
      isDefault: address.isDefault,
    });
    setEditingAddress(address.id);
  };

  if (!user) {
    return null;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        {error && (
          <Alert className="mb-6 border-accent1-200 bg-accent1-50">
            <AlertDescription className="text-accent1-700">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Addresses
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal information and contact details
                  </CardDescription>
                </div>
                {!editingProfile && (
                  <Button
                    onClick={() => setEditingProfile(true)}
                    variant="outline"
                    size="sm"
                    className="border-accent2-200 text-accent2-600 hover:bg-accent2-50"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
              </CardHeader>

              <CardContent>
                {editingProfile ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              firstName: e.target.value,
                            }))
                          }
                          className="focus:border-accent2-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              lastName: e.target.value,
                            }))
                          }
                          className="focus:border-accent2-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="focus:border-accent2-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className="focus:border-accent2-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            dateOfBirth: e.target.value,
                          }))
                        }
                        className="focus:border-accent2-500"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-accent2-600 hover:bg-accent2-700 text-white"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setEditingProfile(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-accent2-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-accent2-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {user.firstName} {user.lastName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Customer since{" "}
                            {new Date(user.createdAt).getFullYear()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {user.isEmailVerified ? (
                          <Badge className="bg-accent3-100 text-accent3-700 hover:bg-accent3-100">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-accent1-100 text-accent1-700"
                          >
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Unverified
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Email</span>
                        </div>
                        <p className="font-medium">{user.email}</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Phone</span>
                        </div>
                        <p className="font-medium">
                          {user.phone || "Not provided"}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Date of Birth
                          </span>
                        </div>
                        <p className="font-medium">
                          {user.dateOfBirth || "Not provided"}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Account Status
                          </span>
                        </div>
                        <p className="font-medium text-accent3-600">Active</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Saved Addresses
                  </CardTitle>
                  <CardDescription>
                    Manage your shipping and billing addresses
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setAddingAddress(true)}
                  className="bg-accent2-600 hover:bg-accent2-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Address
                </Button>
              </CardHeader>

              <CardContent className="space-y-4">
                {user.addresses.length === 0 ? (
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No addresses saved
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Add your first address to make checkout faster
                    </p>
                    <Button
                      onClick={() => setAddingAddress(true)}
                      className="bg-accent2-600 hover:bg-accent2-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Address
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {user.addresses.map((address) => (
                      <div key={address.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="capitalize">
                              {address.type}
                            </Badge>
                            {address.isDefault && (
                              <Badge className="bg-accent2-100 text-accent2-700 hover:bg-accent2-100">
                                Default
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEditingAddress(address)}
                              className="border-accent2-200 text-accent2-600 hover:bg-accent2-50"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteAddress(address.id)}
                              className="border-accent1-200 text-accent1-600 hover:bg-accent1-50"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-1 text-sm">
                          <p className="font-medium">
                            {address.firstName} {address.lastName}
                          </p>
                          {address.company && (
                            <p className="text-gray-600">{address.company}</p>
                          )}
                          <p className="text-gray-600">{address.address}</p>
                          {address.address2 && (
                            <p className="text-gray-600">{address.address2}</p>
                          )}
                          <p className="text-gray-600">
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                          <p className="text-gray-600">{address.country}</p>
                          {address.phone && (
                            <p className="text-gray-600">{address.phone}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {(addingAddress || editingAddress) && (
                  <Card className="border-accent2-200">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {addingAddress ? "Add New Address" : "Edit Address"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={(e) =>
                          addingAddress
                            ? handleAddAddress(e)
                            : handleUpdateAddress(e, editingAddress)
                        }
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="addressType">Type</Label>
                            <select
                              id="addressType"
                              value={addressData.type}
                              onChange={(e) =>
                                setAddressData((prev) => ({
                                  ...prev,
                                  type: e.target.value,
                                }))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-accent2-500 focus:outline-none"
                            >
                              <option value="home">Home</option>
                              <option value="work">Work</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="addressFirstName">First Name</Label>
                            <Input
                              id="addressFirstName"
                              value={addressData.firstName}
                              onChange={(e) =>
                                setAddressData((prev) => ({
                                  ...prev,
                                  firstName: e.target.value,
                                }))
                              }
                              className="focus:border-accent2-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="addressLastName">Last Name</Label>
                            <Input
                              id="addressLastName"
                              value={addressData.lastName}
                              onChange={(e) =>
                                setAddressData((prev) => ({
                                  ...prev,
                                  lastName: e.target.value,
                                }))
                              }
                              className="focus:border-accent2-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="company">Company (Optional)</Label>
                          <Input
                            id="company"
                            value={addressData.company}
                            onChange={(e) =>
                              setAddressData((prev) => ({
                                ...prev,
                                company: e.target.value,
                              }))
                            }
                            className="focus:border-accent2-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="addressLine1">Address</Label>
                          <Input
                            id="addressLine1"
                            value={addressData.address}
                            onChange={(e) =>
                              setAddressData((prev) => ({
                                ...prev,
                                address: e.target.value,
                              }))
                            }
                            className="focus:border-accent2-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="addressLine2">
                            Address Line 2 (Optional)
                          </Label>
                          <Input
                            id="addressLine2"
                            value={addressData.address2}
                            onChange={(e) =>
                              setAddressData((prev) => ({
                                ...prev,
                                address2: e.target.value,
                              }))
                            }
                            className="focus:border-accent2-500"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              value={addressData.city}
                              onChange={(e) =>
                                setAddressData((prev) => ({
                                  ...prev,
                                  city: e.target.value,
                                }))
                              }
                              className="focus:border-accent2-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              value={addressData.state}
                              onChange={(e) =>
                                setAddressData((prev) => ({
                                  ...prev,
                                  state: e.target.value,
                                }))
                              }
                              className="focus:border-accent2-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">ZIP Code</Label>
                            <Input
                              id="zipCode"
                              value={addressData.zipCode}
                              onChange={(e) =>
                                setAddressData((prev) => ({
                                  ...prev,
                                  zipCode: e.target.value,
                                }))
                              }
                              className="focus:border-accent2-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              value={addressData.country}
                              onChange={(e) =>
                                setAddressData((prev) => ({
                                  ...prev,
                                  country: e.target.value,
                                }))
                              }
                              className="focus:border-accent2-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="addressPhone">
                              Phone (Optional)
                            </Label>
                            <Input
                              id="addressPhone"
                              type="tel"
                              value={addressData.phone}
                              onChange={(e) =>
                                setAddressData((prev) => ({
                                  ...prev,
                                  phone: e.target.value,
                                }))
                              }
                              className="focus:border-accent2-500"
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="isDefault"
                            checked={addressData.isDefault}
                            onChange={(e) =>
                              setAddressData((prev) => ({
                                ...prev,
                                isDefault: e.target.checked,
                              }))
                            }
                            className="rounded border-gray-300 text-accent2-600 focus:ring-accent2-500"
                          />
                          <Label htmlFor="isDefault" className="text-sm">
                            Set as default address
                          </Label>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-accent2-600 hover:bg-accent2-700 text-white"
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                              </>
                            ) : addingAddress ? (
                              "Add Address"
                            ) : (
                              "Update Address"
                            )}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setAddingAddress(false);
                              setEditingAddress(null);
                              resetAddressForm();
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order History
                </CardTitle>
                <CardDescription>
                  View and track your recent orders
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No orders yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start shopping to see your orders here
                  </p>
                  <Button
                    onClick={() => router.push("/products")}
                    className="bg-accent2-600 hover:bg-accent2-700 text-white"
                  >
                    Browse Products
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Wishlist
                </CardTitle>
                <CardDescription>Items you've saved for later</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Your wishlist is empty
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Save items you love to your wishlist
                  </p>
                  <Button
                    onClick={() => router.push("/products")}
                    className="bg-accent2-600 hover:bg-accent2-700 text-white"
                  >
                    Browse Products
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Account Settings
                </CardTitle>
                <CardDescription>
                  Manage your account preferences and security
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-gray-600">
                          Receive updates about your orders and promotions
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium">Password & Security</h4>
                        <p className="text-sm text-gray-600">
                          Update your password and security settings
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium">Payment Methods</h4>
                        <p className="text-sm text-gray-600">
                          Manage your saved payment methods
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Danger Zone</h4>
                  <div className="p-4 border border-accent1-200 rounded-lg bg-accent1-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-accent1-900">
                          Delete Account
                        </h5>
                        <p className="text-sm text-accent1-700">
                          Permanently delete your account and all data
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-accent1-300 text-accent1-700 hover:bg-accent1-100"
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
