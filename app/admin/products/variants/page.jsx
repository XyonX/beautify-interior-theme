"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, Package, Palette, Ruler, X } from "lucide-react"

// interface ProductVariant {
//   id: string
//   name: string
//   sku: string
//   price: number
//   compareAtPrice?: number
//   quantity: number
//   image?: string
//   options: { name: string; value: string }[]
//   isActive: boolean
// }

// interface VariantOption {
//   name: string
//   values: string[]
// }

export default function ProductVariantsPage() {
  const [variants, setVariants] = useState([
    {
      id: "1",
      name: "Modern Velvet Sofa - Navy Blue",
      sku: "MVS-001-NB",
      price: 1299.99,
      compareAtPrice: 1599.99,
      quantity: 8,
      options: [{ name: "Color", value: "Navy Blue" }],
      isActive: true,
    },
    {
      id: "2",
      name: "Modern Velvet Sofa - Emerald Green",
      sku: "MVS-001-EG",
      price: 1349.99,
      compareAtPrice: 1649.99,
      quantity: 7,
      options: [{ name: "Color", value: "Emerald Green" }],
      isActive: true,
    },
    {
      id: "3",
      name: "Modern Velvet Sofa - Burgundy",
      sku: "MVS-001-BG",
      price: 1299.99,
      quantity: 0,
      options: [{ name: "Color", value: "Burgundy" }],
      isActive: false,
    },
  ])

  const [variantOptions, setVariantOptions] = useState([
    { name: "Color", values: ["Navy Blue", "Emerald Green", "Burgundy", "Charcoal Gray"] },
    { name: "Size", values: ["Small", "Medium", "Large", "Extra Large"] },
    { name: "Material", values: ["Velvet", "Linen", "Cotton", "Leather"] },
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isOptionDialogOpen, setIsOptionDialogOpen] = useState(false)
  const [newOption, setNewOption] = useState({ name: "", values: [""] })

  const handleAddOptionValue = () => {
    setNewOption((prev) => ({
      ...prev,
      values: [...prev.values, ""],
    }))
  }

  const handleRemoveOptionValue = (index) => {
    setNewOption((prev) => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index),
    }))
  }

  const handleUpdateOptionValue = (index, value) => {
    setNewOption((prev) => ({
      ...prev,
      values: prev.values.map((v, i) => (i === index ? value : v)),
    }))
  }

  const handleCreateOption = () => {
    if (newOption.name && newOption.values.some((v) => v.trim())) {
      setVariantOptions((prev) => [
        ...prev,
        {
          name: newOption.name,
          values: newOption.values.filter((v) => v.trim()),
        },
      ])
      setNewOption({ name: "", values: [""] })
      setIsOptionDialogOpen(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-800" }
    if (quantity <= 5) return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800" }
    return { label: "In Stock", color: "bg-green-100 text-green-800" }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Product Variants</h1>
          <p className="text-sm text-stone-600">Manage product variations and options</p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isOptionDialogOpen} onOpenChange={setIsOptionDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Palette className="h-4 w-4 mr-2" />
                Manage Options
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Manage Variant Options</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="existing" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="existing">Existing Options</TabsTrigger>
                  <TabsTrigger value="new">Add New Option</TabsTrigger>
                </TabsList>

                <TabsContent value="existing" className="space-y-4">
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {variantOptions.map((option, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{option.name}</h4>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {option.values.map((value, valueIndex) => (
                            <Badge key={valueIndex} variant="outline" className="text-xs">
                              {value}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="new" className="space-y-4">
                  <div>
                    <Label htmlFor="optionName">Option Name</Label>
                    <Input
                      id="optionName"
                      value={newOption.name}
                      onChange={(e) => setNewOption((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Color, Size, Material"
                    />
                  </div>

                  <div>
                    <Label>Option Values</Label>
                    <div className="space-y-2">
                      {newOption.values.map((value, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={value}
                            onChange={(e) => handleUpdateOptionValue(index, e.target.value)}
                            placeholder="Option value"
                          />
                          {newOption.values.length > 1 && (
                            <Button variant="ghost" size="sm" onClick={() => handleRemoveOptionValue(index)}>
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button variant="outline" size="sm" onClick={handleAddOptionValue} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Value
                      </Button>
                    </div>
                  </div>

                  <Button onClick={handleCreateOption} className="w-full">
                    Create Option
                  </Button>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-stone-800 hover:bg-stone-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Variant
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create Product Variant</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="variantName">Variant Name</Label>
                  <Input id="variantName" placeholder="e.g., Modern Velvet Sofa - Navy Blue" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="variantSku">SKU</Label>
                    <Input id="variantSku" placeholder="MVS-001-NB" />
                  </div>
                  <div>
                    <Label htmlFor="variantQuantity">Quantity</Label>
                    <Input id="variantQuantity" type="number" placeholder="0" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="variantPrice">Price</Label>
                    <Input id="variantPrice" type="number" step="0.01" placeholder="0.00" />
                  </div>
                  <div>
                    <Label htmlFor="variantComparePrice">Compare at Price</Label>
                    <Input id="variantComparePrice" type="number" step="0.01" placeholder="0.00" />
                  </div>
                </div>

                <div>
                  <Label>Variant Options</Label>
                  <div className="space-y-2">
                    {variantOptions.map((option) => (
                      <div key={option.name}>
                        <Label className="text-sm">{option.name}</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${option.name.toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {option.values.map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button>Create Variant</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Variants List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Product Variants ({variants.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {variants.map((variant) => {
              const stockStatus = getStockStatus(variant.quantity)
              return (
                <div key={variant.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-stone-100 rounded overflow-hidden">
                      {variant.image ? (
                        <img
                          src={variant.image || `${process.env.NEXT_PUBLIC_CDN_URL}/site-data/placeholder.svg`}
                          alt={variant.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="h-6 w-6 text-stone-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-900">{variant.name}</h4>
                      <p className="text-sm text-stone-500">SKU: {variant.sku}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {variant.options.map((option, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {option.name}: {option.value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(variant.price)}</p>
                      {variant.compareAtPrice && (
                        <p className="text-sm text-stone-500 line-through">{formatCurrency(variant.compareAtPrice)}</p>
                      )}
                    </div>

                    <div className="text-center">
                      <p className="font-medium">{variant.quantity}</p>
                      <Badge className={`text-xs ${stockStatus.color}`}>{stockStatus.label}</Badge>
                    </div>

                    <div className="text-center">
                      <Badge
                        className={variant.isActive ? "bg-green-100 text-green-800" : "bg-stone-100 text-stone-800"}
                      >
                        {variant.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Bulk Variant Generator */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Variant Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-stone-600">
              Generate multiple variants automatically by combining different options.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {variantOptions.slice(0, 3).map((option) => (
                <div key={option.name}>
                  <Label className="text-sm font-medium">{option.name}</Label>
                  <div className="mt-2 space-y-2">
                    {option.values.map((value) => (
                      <label key={value} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{value}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <p className="text-sm text-stone-600">
                This will generate <strong>12 variants</strong> based on selected combinations.
              </p>
              <Button>
                <Ruler className="h-4 w-4 mr-2" />
                Generate Variants
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
