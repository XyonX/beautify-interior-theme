"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Folder,
  FolderOpen,
  Upload,
  X,
  ImageIcon,
} from "lucide-react";
import { mockCategories } from "@/lib/mock-data";

export default function AdminCategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentId: "",
    seoTitle: "",
    seoDescription: "",
    isActive: true,
  });

  // Fetch categories from backend on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
        if (!backendUrl) {
          throw new Error("BACKEND_URL is not defined");
        }

        const response = await fetch(`${backendUrl}/api/categories`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const parentCategories = categories.filter((cat) => !cat.parentId);
  const getChildCategories = (parentId) =>
    categories.filter(
      (cat) => cat.parentId === parentId && cat.parentId != cat.Id
    );
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        alert("Please select a valid image file (JPEG, PNG, or WebP)");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setSelectedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById("category-image");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
      if (!backendUrl) {
        throw new Error("BACKEND_URL is not defined");
      }

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("parentId", formData.parentId);
      formDataToSend.append("seoTitle", formData.seoTitle);
      formDataToSend.append("seoDescription", formData.seoDescription);
      formDataToSend.append("isActive", formData.isActive.toString());
      if (selectedImage) formDataToSend.append("thumbnail", selectedImage);

      const response = await fetch(`${backendUrl}/api/categories`, {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create category");
      }

      const newCategory = await response.json(); // Fix: Await the response.json()

      setCategories([...categories, newCategory]);
      setIsCreateDialogOpen(false);

      // Reset form
      setFormData({
        name: "",
        description: "",
        parentId: "",
        seoTitle: "",
        seoDescription: "",
        isActive: true,
      });
      setSelectedImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error creating category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = (categoryId) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== categoryId));
    }
  };

  const handleToggleStatus = (categoryId) => {
    setCategories(
      categories.map((c) =>
        c.id === categoryId ? { ...c, isActive: !c.isActive } : c
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Categories</h1>
          <p className="text-sm text-stone-600">
            Organize your products with categories
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-stone-800 hover:bg-stone-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter category name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Category description"
                  rows={3}
                />
              </div>

              {/* Category Image Upload */}
              <div>
                <Label htmlFor="category-image">Category Image</Label>
                <div className="mt-2">
                  {!imagePreview ? (
                    <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center hover:border-stone-400 transition-colors">
                      <input
                        id="category-image"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                      <label
                        htmlFor="category-image"
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center">
                          <Upload className="h-6 w-6 text-stone-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-stone-900">
                            Upload category image
                          </p>
                          <p className="text-xs text-stone-500">
                            PNG, JPG, WebP up to 5MB
                          </p>
                        </div>
                      </label>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="border border-stone-200 rounded-lg p-2">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Category preview"
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <div className="mt-2 text-xs text-stone-600">
                        <p className="font-medium">{selectedImage?.name}</p>
                        <p>
                          {selectedImage
                            ? (selectedImage.size / 1024 / 1024).toFixed(2)
                            : 0}{" "}
                          MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="parentId">Parent Category</Label>
                <Select
                  value={formData.parentId}
                  onValueChange={(value) =>
                    handleInputChange("parentId", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent category (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Parent</SelectItem>
                    {parentCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* SEO Section */}
              <div className="space-y-3 pt-4 border-t border-stone-200">
                <h4 className="text-sm font-medium text-stone-900">
                  SEO Settings
                </h4>

                <div>
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    value={formData.seoTitle}
                    onChange={(e) =>
                      handleInputChange("seoTitle", e.target.value)
                    }
                    placeholder="SEO title for search engines"
                  />
                </div>

                <div>
                  <Label htmlFor="seoDescription">SEO Description</Label>
                  <Textarea
                    id="seoDescription"
                    value={formData.seoDescription}
                    onChange={(e) =>
                      handleInputChange("seoDescription", e.target.value)
                    }
                    placeholder="SEO description for search engines"
                    rows={2}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-4 border-t border-stone-200">
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
                  {isLoading ? "Creating..." : "Create Category"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-600">Total Categories</p>
                <p className="text-2xl font-bold">{categories.length}</p>
              </div>
              <Folder className="h-8 w-8 text-stone-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-600">Parent Categories</p>
                <p className="text-2xl font-bold">{parentCategories.length}</p>
              </div>
              <FolderOpen className="h-8 w-8 text-stone-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-600">Active Categories</p>
                <p className="text-2xl font-bold">
                  {categories.filter((c) => c.isActive).length}
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Tree */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Categories ({filteredCategories.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredCategories.length > 0 ? (
            <div className="space-y-2 p-4">
              {parentCategories
                .filter((category) =>
                  category.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .map((parentCategory) => {
                  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;

                  console.log(`${cdnUrl}${parentCategory.image}`);
                  return (
                    <div key={parentCategory.id} className="space-y-2">
                      {/* Parent Category */}
                      <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border">
                        <div className="flex items-center space-x-3">
                          {parentCategory.image ? (
                            <img
                              src={
                                `${cdnUrl}${parentCategory.image}` ||
                                "/placeholder.svg"
                              }
                              alt={parentCategory.name}
                              className="h-10 w-10 rounded-md object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 bg-stone-200 rounded-md flex items-center justify-center">
                              <ImageIcon className="h-5 w-5 text-stone-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-stone-900">
                              {parentCategory.name}
                            </p>
                            <p className="text-xs text-stone-500">
                              {parentCategory.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {parentCategory.productCount} products
                          </Badge>
                          <Badge
                            className={`text-xs ${
                              parentCategory.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-stone-100 text-stone-800"
                            }`}
                          >
                            {parentCategory.isActive ? "Active" : "Inactive"}
                          </Badge>
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
                                <Eye className="h-4 w-4 mr-2" />
                                View Products
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Category
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleToggleStatus(parentCategory.id)
                                }
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                {parentCategory.isActive
                                  ? "Deactivate"
                                  : "Activate"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() =>
                                  handleDeleteCategory(parentCategory.id)
                                }
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Child Categories */}
                      {getChildCategories(parentCategory.id).map(
                        (childCategory) => (
                          <div key={childCategory.id} className="ml-8">
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-stone-200">
                              <div className="flex items-center space-x-3">
                                <div className="w-5 h-5 flex items-center justify-center">
                                  <div className="w-2 h-2 bg-stone-300 rounded-full"></div>
                                </div>
                                {childCategory.image ? (
                                  <img
                                    src={
                                      childCategory.image || "/placeholder.svg"
                                    }
                                    alt={childCategory.name}
                                    className="h-8 w-8 rounded-md object-cover"
                                  />
                                ) : (
                                  <div className="h-8 w-8 bg-stone-200 rounded-md flex items-center justify-center">
                                    <ImageIcon className="h-4 w-4 text-stone-400" />
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium text-stone-900">
                                    {childCategory.name}
                                  </p>
                                  <p className="text-xs text-stone-500">
                                    {childCategory.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-xs">
                                  {childCategory.productCount} products
                                </Badge>
                                <Badge
                                  className={`text-xs ${
                                    childCategory.isActive
                                      ? "bg-green-100 text-green-800"
                                      : "bg-stone-100 text-stone-800"
                                  }`}
                                >
                                  {childCategory.isActive
                                    ? "Active"
                                    : "Inactive"}
                                </Badge>
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
                                      <Eye className="h-4 w-4 mr-2" />
                                      View Products
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit Category
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleToggleStatus(childCategory.id)
                                      }
                                    >
                                      <Eye className="h-4 w-4 mr-2" />
                                      {childCategory.isActive
                                        ? "Deactivate"
                                        : "Activate"}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onClick={() =>
                                        handleDeleteCategory(childCategory.id)
                                      }
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Folder className="h-12 w-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-stone-900 mb-2">
                No categories found
              </h3>
              <p className="text-sm text-stone-500 mb-6">
                {searchQuery
                  ? "Try adjusting your search"
                  : "Get started by creating your first category"}
              </p>
              {!searchQuery && (
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-stone-800 hover:bg-stone-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
