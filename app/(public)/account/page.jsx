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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  LogOut,
  Edit,
  Plus,
  Trash2,
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

  // Get addresses safely with fallback to empty array
  const addresses = user?.addresses || [];

  useEffect(() => {
    clearError();

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
  }, [user, router, clearError]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    clearError();
    const success = await updateProfile(profileData);
    if (success) {
      setEditingProfile(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    clearError();
    const success = await addAddress(addressData);
    if (success) {
      setAddingAddress(false);
      resetAddressForm();
    }
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    clearError();
    const success = await updateAddress(editingAddress, addressData);
    if (success) {
      setEditingAddress(null);
      resetAddressForm();
    }
  };

  const handleDeleteAddress = async (addressId) => {
    clearError();
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
      ...address,
      type: address.type || "home",
      company: address.company || "",
      address2: address.address2 || "",
      phone: address.phone || "",
      isDefault: address.isDefault || false,
    });
    setEditingAddress(address.id);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-stone-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="bg-stone-100 rounded-full p-2">
                  <User className="h-6 w-6 text-stone-600" />
                </div>
                <div>
                  <h2 className="font-medium">{`${user.firstName} ${user.lastName}`}</h2>
                  <p className="text-sm text-stone-600">{user.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center space-x-3 p-2 rounded-md text-left ${
                    activeTab === "profile"
                      ? "bg-stone-100 text-stone-800"
                      : "text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`w-full flex items-center space-x-3 p-2 rounded-md text-left ${
                    activeTab === "addresses"
                      ? "bg-stone-100 text-stone-800"
                      : "text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  <MapPin className="h-4 w-4" />
                  <span>Addresses</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 p-2 rounded-md text-left text-stone-600 hover:bg-stone-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Profile Information</CardTitle>
                  {!editingProfile && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingProfile(true)}
                      disabled={isLoading}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
                <CardDescription>
                  Manage your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                {editingProfile ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              firstName: e.target.value,
                            })
                          }
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              lastName: e.target.value,
                            })
                          }
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                        disabled={true} // Email should not be editable
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone: e.target.value,
                          })
                        }
                        disabled={isLoading}
                      />
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setEditingProfile(false)}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : null}
                        Save Changes
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-stone-500 mr-3" />
                      <div>
                        <p className="text-sm text-stone-500">Full Name</p>
                        <p className="font-medium">{`${profileData.firstName} ${profileData.lastName}`}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-stone-500 mr-3" />
                      <div>
                        <p className="text-sm text-stone-500">Email</p>
                        <p className="font-medium">{profileData.email}</p>
                      </div>
                    </div>

                    {profileData.phone && (
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-stone-500 mr-3" />
                        <div>
                          <p className="text-sm text-stone-500">Phone</p>
                          <p className="font-medium">{profileData.phone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Your Addresses</CardTitle>
                    {!addingAddress && !editingAddress && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAddingAddress(true)}
                        disabled={isLoading}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Address
                      </Button>
                    )}
                  </div>
                  <CardDescription>
                    Manage your shipping addresses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {(addingAddress || editingAddress) && (
                    <form
                      onSubmit={
                        editingAddress ? handleUpdateAddress : handleAddAddress
                      }
                      className="space-y-4 mb-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="type">Address Type</Label>
                          <select
                            id="type"
                            value={addressData.type}
                            onChange={(e) =>
                              setAddressData({
                                ...addressData,
                                type: e.target.value,
                              })
                            }
                            className="w-full border border-stone-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                            disabled={isLoading}
                          >
                            <option value="home">Home</option>
                            <option value="work">Work</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="flex items-end">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={addressData.isDefault}
                              onChange={(e) =>
                                setAddressData({
                                  ...addressData,
                                  isDefault: e.target.checked,
                                })
                              }
                              disabled={isLoading}
                              className="h-4 w-4 text-stone-800 border-stone-300 focus:ring-stone-400"
                            />
                            <span className="text-sm text-stone-600">
                              Set as default address
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={addressData.firstName}
                            onChange={(e) =>
                              setAddressData({
                                ...addressData,
                                firstName: e.target.value,
                              })
                            }
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={addressData.lastName}
                            onChange={(e) =>
                              setAddressData({
                                ...addressData,
                                lastName: e.target.value,
                              })
                            }
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="company">Company (Optional)</Label>
                        <Input
                          id="company"
                          value={addressData.company}
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              company: e.target.value,
                            })
                          }
                          disabled={isLoading}
                        />
                      </div>

                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={addressData.address}
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              address: e.target.value,
                            })
                          }
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div>
                        <Label htmlFor="address2">
                          Apartment, suite, etc. (Optional)
                        </Label>
                        <Input
                          id="address2"
                          value={addressData.address2}
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              address2: e.target.value,
                            })
                          }
                          disabled={isLoading}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={addressData.city}
                            onChange={(e) =>
                              setAddressData({
                                ...addressData,
                                city: e.target.value,
                              })
                            }
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State/Province</Label>
                          <Input
                            id="state"
                            value={addressData.state}
                            onChange={(e) =>
                              setAddressData({
                                ...addressData,
                                state: e.target.value,
                              })
                            }
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                          <Input
                            id="zipCode"
                            value={addressData.zipCode}
                            onChange={(e) =>
                              setAddressData({
                                ...addressData,
                                zipCode: e.target.value,
                              })
                            }
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            value={addressData.country}
                            onChange={(e) =>
                              setAddressData({
                                ...addressData,
                                country: e.target.value,
                              })
                            }
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={addressData.phone}
                            onChange={(e) =>
                              setAddressData({
                                ...addressData,
                                phone: e.target.value,
                              })
                            }
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2 pt-4">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setAddingAddress(false);
                            setEditingAddress(null);
                            resetAddressForm();
                          }}
                          disabled={isLoading}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : null}
                          {editingAddress ? "Update Address" : "Add Address"}
                        </Button>
                      </div>
                    </form>
                  )}

                  {addresses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map((address) => (
                        <Card key={address.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center space-x-2 mb-2">
                                  <h4 className="font-medium">
                                    {address.firstName} {address.lastName}
                                  </h4>
                                  {address.isDefault && (
                                    <Badge
                                      variant="default"
                                      className="text-xs"
                                    >
                                      Default
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-stone-600 capitalize">
                                  {address.type}
                                </p>
                                <p className="text-sm mt-1">
                                  {address.company && (
                                    <>
                                      {address.company}
                                      <br />
                                    </>
                                  )}
                                  {address.address}
                                  {address.address2 && (
                                    <>, {address.address2}</>
                                  )}
                                  <br />
                                  {address.city}, {address.state}{" "}
                                  {address.zipCode}
                                  <br />
                                  {address.country}
                                </p>
                                {address.phone && (
                                  <p className="text-sm mt-1">
                                    Phone: {address.phone}
                                  </p>
                                )}
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => startEditingAddress(address)}
                                  disabled={isLoading}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleDeleteAddress(address.id)
                                  }
                                  disabled={isLoading}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : !addingAddress && !editingAddress ? (
                    <div className="text-center py-8">
                      <MapPin className="h-12 w-12 mx-auto text-stone-300 mb-4" />
                      <h3 className="font-medium text-stone-700">
                        No saved addresses
                      </h3>
                      <p className="text-stone-500 text-sm mt-1">
                        Add your first address to get started
                      </p>
                      <Button
                        className="mt-4"
                        onClick={() => setAddingAddress(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Address
                      </Button>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
