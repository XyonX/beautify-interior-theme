"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, X, Plus, ImageIcon } from "lucide-react";
import { mockCategories } from "@/lib/mock-data";

// interface ImagePreview {
//   id: string
//   file: File
//   url: string
//   name: string
//   size: number
// }

export default function NewProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [thumbnailDragActive, setThumbnailDragActive] = useState(false);
  const [imageError, setImageError] = useState("");
  const [thumbnailError, setThumbnailError] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    shortDescription: "",
    sku: "",
    price: 0,
    compareAtPrice: 0,
    costPrice: 0,
    trackQuantity: true,
    quantity: 0,
    lowStockThreshold: 5,
    weight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
      unit: "cm",
    },
    categoryId: "",
    tags: [],
    status: "draft",
    visibility: "visible",
    isFeatured: false,
    isNew: false,
    onSale: false,
    images: [],
    thumbnail: null,
    attributes: [],
    seoTitle: "",
    seoDescription: "",
    vendor: "",
  });
  const [currentTag, setCurrentTag] = useState("");
  const [currentAttribute, setCurrentAttribute] = useState({
    name: "",
    value: "",
    type: "text",
  });

  const MAX_IMAGES = 5;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  const validateImage = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Only JPEG, PNG, and WebP images are allowed";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "Image size must be less than 5MB";
    }
    return null;
  };

  // Thumbnail image handling
  const handleThumbnailUpload = async (files) => {
    setThumbnailError("");
    const file = Array.from(files)[0];

    if (!file) return;

    const error = validateImage(file);
    if (error) {
      setThumbnailError(error);
      return;
    }

    setThumbnailUploading(true);

    try {
      const url = URL.createObjectURL(file);
      const preview = {
        id: Math.random().toString(36).substring(2, 15),
        file,
        url,
        name: file.name,
        size: file.size,
      };

      // Clean up previous thumbnail URL
      if (thumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview.url);
      }

      setThumbnailPreview(preview);
      setFormData((prev) => ({ ...prev, thumbnail: file }));
    } catch (error) {
      setThumbnailError("Failed to process thumbnail image");
    } finally {
      setThumbnailUploading(false);
    }
  };

  const removeThumbnail = () => {
    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview.url);
      setThumbnailPreview(null);
      setFormData((prev) => ({ ...prev, thumbnail: null }));
      setThumbnailError("");
    }
  };

  const handleThumbnailDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setThumbnailDragActive(true);
    } else if (e.type === "dragleave") {
      setThumbnailDragActive(false);
    }
  };

  const handleThumbnailDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setThumbnailDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleThumbnailUpload(e.dataTransfer.files);
    }
  };

  const handleThumbnailFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleThumbnailUpload(e.target.files);
    }
  };

  // Product images handling
  const handleImageUpload = async (files) => {
    setImageError("");
    const fileArray = Array.from(files);

    // Check if adding these files would exceed the limit
    if (imagePreviews.length + fileArray.length > MAX_IMAGES) {
      setImageError(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    setImageUploading(true);

    try {
      const newPreviews = [];

      for (const file of fileArray) {
        const error = validateImage(file);
        if (error) {
          setImageError(error);
          continue;
        }

        // Create preview URL
        const url = URL.createObjectURL(file);
        const preview = {
          id: Math.random().toString(36).substring(2, 15),
          file,
          url,
          name: file.name,
          size: file.size,
        };
        newPreviews.push(preview);
      }

      setImagePreviews((prev) => [...prev, ...newPreviews]);

      // Update form data
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newPreviews.map((p) => p.file)],
      }));
    } catch (error) {
      setImageError("Failed to process images");
    } finally {
      setImageUploading(false);
    }
  };

  const removeImage = (imageId) => {
    setImagePreviews((prev) => {
      const imageToRemove = prev.find((img) => img.id === imageId);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.url);
      }
      return prev.filter((img) => img.id !== imageId);
    });

    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => {
        const preview = imagePreviews.find((p) => p.id === imageId);
        return preview ? prev.images[index] !== preview.file : true;
      }),
    }));

    setImageError("");
  };

  const reorderImages = (fromIndex, toIndex) => {
    setImagePreviews((prev) => {
      const newPreviews = [...prev];
      const [removed] = newPreviews.splice(fromIndex, 1);
      newPreviews.splice(toIndex, 0, removed);
      return newPreviews;
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDimensionChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [field]: value },
    }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleAddAttribute = () => {
    if (currentAttribute.name.trim() && currentAttribute.value.trim()) {
      setFormData((prev) => ({
        ...prev,
        attributes: [...prev.attributes, { ...currentAttribute }],
      }));
      setCurrentAttribute({ name: "", value: "", type: "text" });
    }
  };

  const handleRemoveAttribute = (index) => {
    setFormData((prev) => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate SKU if not provided
      if (!formData.sku) {
        const sku =
          formData.name
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "")
            .substring(0, 6) +
          "-" +
          Math.random().toString(36).substring(2, 5).toUpperCase();
        formData.sku = sku;
      }

      console.log("Creating product:", formData);
      console.log(
        "Thumbnail:",
        thumbnailPreview
          ? { name: thumbnailPreview.name, size: thumbnailPreview.size }
          : null
      );
      console.log(
        "Product Images:",
        imagePreviews.map((img) => ({
          name: img.name,
          size: img.size,
          type: img.file.type,
        }))
      );

      router.push("/admin/products");
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">
            Add New Product
          </h1>
          <p className="text-sm text-stone-600">
            Create a new product for your store
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Product Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Input
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) =>
                      handleInputChange("shortDescription", e.target.value)
                    }
                    placeholder="Brief product description"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Detailed product description"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      value={formData.sku}
                      onChange={(e) => handleInputChange("sku", e.target.value)}
                      placeholder="Auto-generated if empty"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.categoryId}
                      onValueChange={(value) =>
                        handleInputChange("categoryId", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="vendor">Vendor</Label>
                    <Input
                      id="vendor"
                      value={formData.vendor}
                      onChange={(e) =>
                        handleInputChange("vendor", e.target.value)
                      }
                      placeholder="Product vendor"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Thumbnail */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ImageIcon className="h-5 w-5" />
                  <span>Product Thumbnail</span>
                </CardTitle>
                <p className="text-sm text-stone-600">
                  Main image displayed in product listings and search results
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {!thumbnailPreview ? (
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      thumbnailDragActive
                        ? "border-stone-400 bg-stone-50"
                        : "border-stone-300 hover:border-stone-400"
                    }`}
                    onDragEnter={handleThumbnailDrag}
                    onDragLeave={handleThumbnailDrag}
                    onDragOver={handleThumbnailDrag}
                    onDrop={handleThumbnailDrop}
                  >
                    <ImageIcon className="h-12 w-12 text-stone-400 mx-auto mb-3" />
                    <p className="text-sm text-stone-600 mb-2">
                      Drag and drop thumbnail image here
                    </p>
                    <p className="text-xs text-stone-500 mb-3">
                      Supports: JPEG, PNG, WebP (Max 5MB)
                    </p>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleThumbnailFileInput}
                      className="hidden"
                      id="thumbnail-upload"
                      disabled={thumbnailUploading}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        document.getElementById("thumbnail-upload")?.click()
                      }
                      disabled={thumbnailUploading}
                    >
                      {thumbnailUploading ? "Uploading..." : "Choose Thumbnail"}
                    </Button>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="relative border rounded-lg overflow-hidden bg-stone-50">
                      <div className="aspect-square max-w-xs mx-auto">
                        <img
                          src={thumbnailPreview.url || "/placeholder.svg"}
                          alt={thumbnailPreview.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={removeThumbnail}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-2 text-center">
                      <p
                        className="text-sm text-stone-600 truncate"
                        title={thumbnailPreview.name}
                      >
                        {thumbnailPreview.name}
                      </p>
                      <p className="text-xs text-stone-500">
                        {formatFileSize(thumbnailPreview.size)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Thumbnail Error Message */}
                {thumbnailError && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                    {thumbnailError}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Product Images */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Upload className="h-5 w-5" />
                    <span>Product Images</span>
                  </div>
                  <span className="text-sm text-stone-500 font-normal">
                    {imagePreviews.length}/{MAX_IMAGES} images
                  </span>
                </CardTitle>
                <p className="text-sm text-stone-600">
                  Additional images for product gallery and detailed views
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive
                      ? "border-stone-400 bg-stone-50"
                      : "border-stone-300 hover:border-stone-400"
                  } ${
                    imagePreviews.length >= MAX_IMAGES
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-8 w-8 text-stone-400 mx-auto mb-2" />
                  <p className="text-sm text-stone-600 mb-2">
                    {imagePreviews.length >= MAX_IMAGES
                      ? `Maximum ${MAX_IMAGES} images reached`
                      : "Drag and drop product images here, or click to select"}
                  </p>
                  <p className="text-xs text-stone-500 mb-3">
                    Supports: JPEG, PNG, WebP (Max 5MB each)
                  </p>
                  {imagePreviews.length < MAX_IMAGES && (
                    <>
                      <input
                        type="file"
                        multiple
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleFileInput}
                        className="hidden"
                        id="image-upload"
                        disabled={imageUploading}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          document.getElementById("image-upload")?.click()
                        }
                        disabled={imageUploading}
                      >
                        {imageUploading ? "Uploading..." : "Choose Images"}
                      </Button>
                    </>
                  )}
                </div>

                {/* Error Message */}
                {imageError && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                    {imageError}
                  </div>
                )}

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-stone-900">
                        Product Gallery
                      </h4>
                      <p className="text-xs text-stone-500">
                        Images will appear in the order shown
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {imagePreviews.map((image, index) => (
                        <div
                          key={image.id}
                          className="relative group border rounded-lg overflow-hidden bg-stone-50"
                        >
                          {/* Image Order Badge */}
                          <div className="absolute top-2 left-2 z-10">
                            <Badge
                              variant="default"
                              className="text-xs bg-stone-800"
                            >
                              {index + 1}
                            </Badge>
                          </div>

                          {/* Remove Button */}
                          <button
                            type="button"
                            onClick={() => removeImage(image.id)}
                            className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>

                          {/* Image */}
                          <div className="aspect-square relative">
                            <img
                              src={image.url || "/placeholder.svg"}
                              alt={image.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Image Info */}
                          <div className="p-2 bg-white">
                            <p
                              className="text-xs text-stone-600 truncate"
                              title={image.name}
                            >
                              {image.name}
                            </p>
                            <p className="text-xs text-stone-500">
                              {formatFileSize(image.size)}
                            </p>
                          </div>

                          {/* Reorder Buttons */}
                          <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => reorderImages(index, index - 1)}
                                className="bg-stone-800 hover:bg-stone-700 text-white rounded px-2 py-1 text-xs"
                              >
                                ←
                              </button>
                            )}
                            {index < imagePreviews.length - 1 && (
                              <button
                                type="button"
                                onClick={() => reorderImages(index, index + 1)}
                                className="bg-stone-800 hover:bg-stone-700 text-white rounded px-2 py-1 text-xs"
                              >
                                →
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        handleInputChange(
                          "price",
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="compareAtPrice">Compare at Price</Label>
                    <Input
                      id="compareAtPrice"
                      type="number"
                      step="0.01"
                      value={formData.compareAtPrice}
                      onChange={(e) =>
                        handleInputChange(
                          "compareAtPrice",
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="costPrice">Cost Price</Label>
                    <Input
                      id="costPrice"
                      type="number"
                      step="0.01"
                      value={formData.costPrice}
                      onChange={(e) =>
                        handleInputChange(
                          "costPrice",
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inventory */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="trackQuantity"
                    checked={formData.trackQuantity}
                    onCheckedChange={(checked) =>
                      handleInputChange("trackQuantity", checked)
                    }
                  />
                  <Label htmlFor="trackQuantity">Track quantity</Label>
                </div>

                {formData.trackQuantity && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={(e) =>
                          handleInputChange(
                            "quantity",
                            Number.parseInt(e.target.value) || 0
                          )
                        }
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lowStockThreshold">
                        Low Stock Threshold
                      </Label>
                      <Input
                        id="lowStockThreshold"
                        type="number"
                        value={formData.lowStockThreshold}
                        onChange={(e) =>
                          handleInputChange(
                            "lowStockThreshold",
                            Number.parseInt(e.target.value) || 0
                          )
                        }
                        placeholder="5"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Shipping */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.01"
                    value={formData.weight}
                    onChange={(e) =>
                      handleInputChange(
                        "weight",
                        Number.parseFloat(e.target.value) || 0
                      )
                    }
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label>Dimensions</Label>
                  <div className="grid grid-cols-4 gap-2">
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.dimensions.length}
                      onChange={(e) =>
                        handleDimensionChange(
                          "length",
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="Length"
                    />
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.dimensions.width}
                      onChange={(e) =>
                        handleDimensionChange(
                          "width",
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="Width"
                    />
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.dimensions.height}
                      onChange={(e) =>
                        handleDimensionChange(
                          "height",
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="Height"
                    />
                    <Select
                      value={formData.dimensions.unit}
                      onValueChange={(value) =>
                        handleDimensionChange("unit", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="in">in</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Attributes */}
            <Card>
              <CardHeader>
                <CardTitle>Product Attributes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    value={currentAttribute.name}
                    onChange={(e) =>
                      setCurrentAttribute((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Attribute name"
                  />
                  <Input
                    value={currentAttribute.value}
                    onChange={(e) =>
                      setCurrentAttribute((prev) => ({
                        ...prev,
                        value: e.target.value,
                      }))
                    }
                    placeholder="Attribute value"
                  />
                  <div className="flex space-x-2">
                    <Select
                      value={currentAttribute.type}
                      onValueChange={(value) =>
                        setCurrentAttribute((prev) => ({ ...prev, type }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="boolean">Boolean</SelectItem>
                        <SelectItem value="select">Select</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleAddAttribute}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  {formData.attributes.map((attr, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-stone-50 rounded"
                    >
                      <span className="text-sm">
                        <strong>{attr.name}:</strong> {attr.value} ({attr.type})
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveAttribute(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* SEO */}
            <Card>
              <CardHeader>
                <CardTitle>SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    value={formData.seoTitle}
                    onChange={(e) =>
                      handleInputChange("seoTitle", e.target.value)
                    }
                    placeholder="SEO optimized title"
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
                    placeholder="SEO meta description"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Status */}
            <Card>
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleInputChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select
                    value={formData.visibility}
                    onValueChange={(value) =>
                      handleInputChange("visibility", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visible">Visible</SelectItem>
                      <SelectItem value="hidden">Hidden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Product Flags */}
            <Card>
              <CardHeader>
                <CardTitle>Product Flags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) =>
                      handleInputChange("isFeatured", checked)
                    }
                  />
                  <Label htmlFor="isFeatured">Featured Product</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isNew"
                    checked={formData.isNew}
                    onCheckedChange={(checked) =>
                      handleInputChange("isNew", checked)
                    }
                  />
                  <Label htmlFor="isNew">New Product</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="onSale"
                    checked={formData.onSale}
                    onCheckedChange={(checked) =>
                      handleInputChange("onSale", checked)
                    }
                  />
                  <Label htmlFor="onSale">On Sale</Label>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add tag"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), handleAddTag())
                    }
                  />
                  <Button type="button" size="sm" onClick={handleAddTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center space-x-1"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-stone-800 hover:bg-stone-700"
          >
            {isLoading ? "Creating..." : "Create Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
