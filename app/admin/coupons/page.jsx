"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Percent,
  Calendar,
  Users,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Mock coupons data
const mockCoupons = [
  {
    id: "1",
    code: "SUMMER25",
    type: "percentage",
    value: 25,
    minimumAmount: 100,
    usageLimit: 100,
    usageCount: 45,
    isActive: true,
    expiresAt: "2025-08-31T23:59:59Z",
    createdAt: "2024-05-01T00:00:00Z",
    updatedAt: "2024-05-01T00:00:00Z",
  },
  {
    id: "2",
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minimumAmount: null,
    usageLimit: null,
    usageCount: 128,
    isActive: true,
    expiresAt: null,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    code: "FREESHIP",
    type: "free_shipping",
    value: 0,
    minimumAmount: 75,
    usageLimit: 200,
    usageCount: 89,
    isActive: true,
    expiresAt: "2025-12-31T23:59:59Z",
    createdAt: "2024-02-15T00:00:00Z",
    updatedAt: "2024-02-15T00:00:00Z",
  },
  {
    id: "4",
    code: "FLAT20",
    type: "fixed_amount",
    value: 20,
    minimumAmount: 50,
    usageLimit: 50,
    usageCount: 50,
    isActive: false,
    expiresAt: "2024-04-30T23:59:59Z",
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-05-01T00:00:00Z",
  },
  {
    id: "5",
    code: "SPRING15",
    type: "percentage",
    value: 15,
    minimumAmount: null,
    usageLimit: null,
    usageCount: 0,
    isActive: false,
    expiresAt: "2024-03-31T23:59:59Z",
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },
];

export default function AdminCouponsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [coupons, setCoupons] = useState(mockCoupons);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state for new coupon
  const [formData, setFormData] = useState({
    code: "",
    type: "percentage",
    value: 10,
    minimumAmount: "",
    usageLimit: "",
    isActive: true,
    expiresAt: "",
  });

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch = coupon.code
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && coupon.isActive) ||
      (statusFilter === "inactive" && !coupon.isActive);
    const matchesType = typeFilter === "all" || coupon.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getTypeColor = (type) => {
    switch (type) {
      case "percentage":
        return "bg-blue-100 text-blue-800";
      case "fixed_amount":
        return "bg-green-100 text-green-800";
      case "free_shipping":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-stone-100 text-stone-800";
    }
  };

  const formatValue = (coupon) => {
    switch (coupon.type) {
      case "percentage":
        return `${coupon.value}%`;
      case "fixed_amount":
        return `$${coupon.value}`;
      case "free_shipping":
        return "Free Shipping";
      default:
        return coupon.value.toString();
    }
  };

  const isExpired = (coupon) => {
    if (!coupon.expiresAt) return false;
    return new Date(coupon.expiresAt) < new Date();
  };

  const isUsageLimitReached = (coupon) => {
    if (!coupon.usageLimit) return false;
    return coupon.usageCount >= coupon.usageLimit;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newCoupon = {
        id: (coupons.length + 1).toString(),
        code: formData.code.toUpperCase(),
        type: formData.type,
        value: Number(formData.value),
        minimumAmount: formData.minimumAmount
          ? Number(formData.minimumAmount)
          : null,
        usageLimit: formData.usageLimit ? Number(formData.usageLimit) : null,
        usageCount: 0,
        isActive: formData.isActive,
        expiresAt: formData.expiresAt || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setCoupons([...coupons, newCoupon]);
      setIsCreateDialogOpen(false);
      setFormData({
        code: "",
        type: "percentage",
        value: 10,
        minimumAmount: "",
        usageLimit: "",
        isActive: true,
        expiresAt: "",
      });
    } catch (error) {
      console.error("Error creating coupon:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Coupons</h1>
          <p className="text-sm text-stone-600">
            Manage discount codes and promotions
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-stone-800 hover:bg-stone-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <Label htmlFor="code">Coupon Code *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => handleInputChange("code", e.target.value)}
                  placeholder="e.g., SUMMER25"
                  required
                />
              </div>

              <div>
                <Label htmlFor="type">Discount Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed_amount">Fixed Amount</SelectItem>
                    <SelectItem value="free_shipping">Free Shipping</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.type !== "free_shipping" && (
                <div>
                  <Label htmlFor="value">
                    {formData.type === "percentage"
                      ? "Discount Percentage (%)"
                      : "Discount Amount (₹)"}
                  </Label>
                  <Input
                    id="value"
                    type="number"
                    value={formData.value}
                    onChange={(e) => handleInputChange("value", e.target.value)}
                    min={0}
                    max={formData.type === "percentage" ? 100 : undefined}
                    required
                  />
                </div>
              )}

              <div>
                <Label htmlFor="minimumAmount">
                  Minimum Purchase Amount (₹)
                </Label>
                <Input
                  id="minimumAmount"
                  type="number"
                  value={formData.minimumAmount}
                  onChange={(e) =>
                    handleInputChange("minimumAmount", e.target.value)
                  }
                  min={0}
                  placeholder="Optional"
                />
              </div>

              <div>
                <Label htmlFor="usageLimit">Usage Limit</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) =>
                    handleInputChange("usageLimit", e.target.value)
                  }
                  min={0}
                  placeholder="Optional"
                />
              </div>

              <div>
                <Label htmlFor="expiresAt">Expiration Date</Label>
                <Input
                  id="expiresAt"
                  type="date"
                  value={formData.expiresAt}
                  onChange={(e) =>
                    handleInputChange("expiresAt", e.target.value)
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    handleInputChange("isActive", checked)
                  }
                />
                <Label htmlFor="isActive">Active</Label>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Coupon"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
                <Input
                  placeholder="Search coupons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed_amount">Fixed Amount</SelectItem>
                <SelectItem value="free_shipping">Free Shipping</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Coupons Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Coupons ({filteredCoupons.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredCoupons.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-stone-200">
                  <tr>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Code
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Type
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Value
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Usage
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Expires
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Status
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoupons.map((coupon) => (
                    <tr
                      key={coupon.id}
                      className="border-b border-stone-100 hover:bg-stone-50"
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-mono font-medium text-stone-900">
                            {coupon.code}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() =>
                              navigator.clipboard.writeText(coupon.code)
                            }
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          className={`text-xs ${getTypeColor(coupon.type)}`}
                        >
                          {coupon.type.replace("_", " ")}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-medium text-stone-900">
                          {formatValue(coupon)}
                        </span>
                        {coupon.minimumAmount && (
                          <p className="text-xs text-stone-500">
                            Min: ${coupon.minimumAmount}
                          </p>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center text-sm text-stone-700">
                          <Users className="h-3 w-3 mr-1" />
                          {coupon.usageCount}
                          {coupon.usageLimit && ` / ${coupon.usageLimit}`}
                        </div>
                        {isUsageLimitReached(coupon) && (
                          <Badge className="text-xs bg-red-100 text-red-800 mt-1">
                            Limit Reached
                          </Badge>
                        )}
                      </td>
                      <td className="p-4">
                        {coupon.expiresAt ? (
                          <div>
                            <div className="flex items-center text-sm text-stone-700">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(coupon.expiresAt).toLocaleDateString()}
                            </div>
                            {isExpired(coupon) && (
                              <Badge className="text-xs bg-red-100 text-red-800 mt-1">
                                Expired
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-stone-500">
                            No expiry
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <Badge
                          className={`text-xs ${
                            coupon.isActive &&
                            !isExpired(coupon) &&
                            !isUsageLimitReached(coupon)
                              ? "bg-green-100 text-green-800"
                              : "bg-stone-100 text-stone-800"
                          }`}
                        >
                          {coupon.isActive &&
                          !isExpired(coupon) &&
                          !isUsageLimitReached(coupon)
                            ? "Active"
                            : "Inactive"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Percent className="h-12 w-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-stone-900 mb-2">
                No coupons found
              </h3>
              <p className="text-sm text-stone-500 mb-6">
                {searchQuery || statusFilter !== "all" || typeFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Create your first coupon to start offering discounts"}
              </p>
              {!searchQuery &&
                statusFilter === "all" &&
                typeFilter === "all" && (
                  <Button
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="bg-stone-800 hover:bg-stone-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Coupon
                  </Button>
                )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
