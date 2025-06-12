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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  MoreHorizontal,
  UserPlus,
  Shield,
  Key,
  UserCheck,
  UserX,
} from "lucide-react";

// Mock admin users data
const mockAdminUsers = [
  {
    id: "1",
    firstName: "John",
    lastName: "Admin",
    email: "admin@beautifyinterior.com",
    role: "super_admin",
    permissions: ["all"],
    isActive: true,
    lastLogin: "2023-06-01T10:30:00Z",
    createdAt: "2023-01-15T08:00:00Z",
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Manager",
    email: "sarah@beautifyinterior.com",
    role: "admin",
    permissions: ["products", "orders", "customers", "inventory"],
    isActive: true,
    lastLogin: "2023-06-05T14:20:00Z",
    createdAt: "2023-02-10T09:15:00Z",
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Support",
    email: "michael@beautifyinterior.com",
    role: "support",
    permissions: ["orders", "customers"],
    isActive: true,
    lastLogin: "2023-06-07T11:45:00Z",
    createdAt: "2023-03-05T10:30:00Z",
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Content",
    email: "emily@beautifyinterior.com",
    role: "editor",
    permissions: ["products", "content"],
    isActive: false,
    lastLogin: "2023-05-20T09:10:00Z",
    createdAt: "2023-04-12T13:45:00Z",
  },
];

// Available permissions
const availablePermissions = [
  { id: "products", label: "Products Management" },
  { id: "orders", label: "Orders Management" },
  { id: "customers", label: "Customers Management" },
  { id: "inventory", label: "Inventory Management" },
  { id: "analytics", label: "Analytics & Reports" },
  { id: "marketing", label: "Marketing Tools" },
  { id: "settings", label: "System Settings" },
  { id: "users", label: "User Management" },
  { id: "content", label: "Content Management" },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [users, setUsers] = useState(mockAdminUsers);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state for new user
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "support",
    permissions: ["orders", "customers"],
    isActive: true,
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePermissionChange = (permission, checked) => {
    setFormData((prev) => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, permission]
        : prev.permissions.filter((p) => p !== permission),
    }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser = {
        id: (users.length + 1).toString(),
        ...formData,
        lastLogin: null,
        createdAt: new Date().toISOString(),
      };

      setUsers([...users, newUser]);
      setIsCreateDialogOpen(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        role: "support",
        permissions: ["orders", "customers"],
        isActive: true,
      });
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "super_admin":
        return (
          <Badge className="bg-purple-100 text-purple-800">Super Admin</Badge>
        );
      case "admin":
        return <Badge className="bg-blue-100 text-blue-800">Admin</Badge>;
      case "support":
        return <Badge className="bg-green-100 text-green-800">Support</Badge>;
      case "editor":
        return <Badge className="bg-amber-100 text-amber-800">Editor</Badge>;
      default:
        return <Badge className="bg-stone-100 text-stone-800">{role}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">
            User Management
          </h1>
          <p className="text-sm text-stone-600">
            Manage admin users and permissions
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-stone-800 hover:bg-stone-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange("role", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {availablePermissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`permission-${permission.id}`}
                        checked={formData.permissions.includes(permission.id)}
                        onCheckedChange={(checked) =>
                          handlePermissionChange(permission.id, !!checked)
                        }
                      />
                      <label
                        htmlFor={`permission-${permission.id}`}
                        className="text-sm"
                      >
                        {permission.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    handleInputChange("isActive", checked)
                  }
                />
                <Label htmlFor="isActive">Active Account</Label>
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
                  {isLoading ? "Creating..." : "Create User"}
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
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Users ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-stone-200">
                  <tr>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      User
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Role
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Permissions
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Status
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Last Login
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-stone-100 hover:bg-stone-50"
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-stone-700">
                              {user.firstName[0]}
                              {user.lastName[0]}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-stone-900">
                              {user.firstName} {user.lastName}
                            </p>
                            <p className="text-xs text-stone-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{getRoleBadge(user.role)}</td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {user.permissions.includes("all") ? (
                            <Badge variant="outline" className="text-xs">
                              All Permissions
                            </Badge>
                          ) : (
                            user.permissions.slice(0, 2).map((permission) => (
                              <Badge
                                key={permission}
                                variant="outline"
                                className="text-xs"
                              >
                                {permission}
                              </Badge>
                            ))
                          )}
                          {user.permissions.length > 2 &&
                            user.permissions[0] !== "all" && (
                              <Badge variant="outline" className="text-xs">
                                +{user.permissions.length - 2}
                              </Badge>
                            )}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          className={
                            user.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-stone-600">
                          {user.lastLogin
                            ? new Date(user.lastLogin).toLocaleDateString()
                            : "Never"}
                        </span>
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
                              <Shield className="h-4 w-4 mr-2" />
                              Edit Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Key className="h-4 w-4 mr-2" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleToggleStatus(user.id)}
                            >
                              {user.isActive ? (
                                <>
                                  <UserX className="h-4 w-4 mr-2" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Activate
                                </>
                              )}
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
              <Shield className="h-12 w-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-stone-900 mb-2">
                No users found
              </h3>
              <p className="text-sm text-stone-500 mb-6">
                {searchQuery || roleFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Add users to manage your store"}
              </p>
              {!searchQuery && roleFilter === "all" && (
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-stone-800 hover:bg-stone-700"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Role Descriptions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Role Descriptions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-purple-100 text-purple-800">
                  Super Admin
                </Badge>
              </div>
              <p className="text-sm text-stone-600">
                Full access to all features and settings. Can manage users and
                assign roles.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-blue-100 text-blue-800">Admin</Badge>
              </div>
              <p className="text-sm text-stone-600">
                Access to most features except user management and critical
                system settings.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-green-100 text-green-800">Support</Badge>
              </div>
              <p className="text-sm text-stone-600">
                Can view and manage orders and customers. Limited access to
                other features.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-amber-100 text-amber-800">Editor</Badge>
              </div>
              <p className="text-sm text-stone-600">
                Can manage products and content. No access to orders or customer
                data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
