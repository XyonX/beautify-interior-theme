"use client";

import { useState } from "react";
import Link from "next/link";
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
  Truck,
  Clock,
  DollarSign,
} from "lucide-react";
import { mockShippingMethods } from "@/lib/mock-data";

export default function AdminShippingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [shippingMethods] = useState(mockShippingMethods);

  const filteredMethods = shippingMethods.filter((method) => {
    const matchesSearch = method.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && method.isActive) ||
      (statusFilter === "inactive" && !method.isActive);

    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">
            Shipping Methods
          </h1>
          <p className="text-sm text-stone-600">
            Manage shipping options and rates
          </p>
        </div>
        <Link href="/admin/shipping/new">
          <Button className="bg-stone-800 hover:bg-stone-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Shipping Method
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
                <Input
                  placeholder="Search shipping methods..."
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
          </div>
        </CardContent>
      </Card>

      {/* Shipping Methods Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Shipping Methods ({filteredMethods.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredMethods.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-stone-200">
                  <tr>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Method
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Description
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Price
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Delivery Time
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Free Shipping
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
                  {filteredMethods.map((method) => (
                    <tr
                      key={method.id}
                      className="border-b border-stone-100 hover:bg-stone-50"
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Truck className="h-4 w-4 text-stone-600" />
                          <span className="text-sm font-medium text-stone-900">
                            {method.name}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-stone-700">
                          {method.description}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-3 w-3 text-stone-600" />
                          <span className="text-sm font-medium text-stone-900">
                            {formatCurrency(method.price)}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 text-stone-600" />
                          <span className="text-sm text-stone-700">
                            {method.estimatedDays}{" "}
                            {method.estimatedDays === 1 ? "day" : "days"}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        {method.freeShippingThreshold ? (
                          <span className="text-sm text-stone-700">
                            Over {formatCurrency(method.freeShippingThreshold)}
                          </span>
                        ) : (
                          <span className="text-sm text-stone-500">No</span>
                        )}
                      </td>
                      <td className="p-4">
                        <Badge
                          className={`text-xs ${
                            method.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-stone-100 text-stone-800"
                          }`}
                        >
                          {method.isActive ? "Active" : "Inactive"}
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
              <Truck className="h-12 w-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-stone-900 mb-2">
                No shipping methods found
              </h3>
              <p className="text-sm text-stone-500 mb-6">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Create your first shipping method to start offering delivery options"}
              </p>
              {!searchQuery && statusFilter === "all" && (
                <Link href="/admin/shipping/new">
                  <Button className="bg-stone-800 hover:bg-stone-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Shipping Method
                  </Button>
                </Link>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
