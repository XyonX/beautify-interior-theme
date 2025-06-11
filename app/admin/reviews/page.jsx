"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, MoreHorizontal, Eye, Check, X, Star, Calendar, User, Package } from "lucide-react"
import { mockReviews } from "@/lib/mock-data"

export default function AdminReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [reviews, setReviews] = useState(mockReviews)
  const [selectedReview, setSelectedReview] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.product?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || review.status === statusFilter
    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter

    return matchesSearch && matchesStatus && matchesRating
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-stone-100 text-stone-800"
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-3 w-3 ${i < rating ? "text-yellow-400 fill-current" : "text-stone-300"}`} />
        ))}
      </div>
    )
  }

  const handleViewReview = (review: any) => {
    setSelectedReview(review)
    setIsViewDialogOpen(true)
  }

  const handleUpdateStatus = (reviewId: string, status: string) => {
    setReviews(reviews.map((review) => (review.id === reviewId ? { ...review, status } : review)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Reviews</h1>
          <p className="text-sm text-stone-600">Manage customer product reviews</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
                <Input
                  placeholder="Search reviews..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Reviews ({filteredReviews.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredReviews.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-stone-200">
                  <tr>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">Product</th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">Customer</th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">Rating</th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">Review</th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">Date</th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">Status</th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReviews.map((review) => (
                    <tr key={review.id} className="border-b border-stone-100 hover:bg-stone-50">
                      <td className="p-4">
                        <div>
                          <p className="text-sm font-medium text-stone-900">
                            {review.product?.name || "Modern Velvet Sofa"}
                          </p>
                          <p className="text-xs text-stone-500">SKU: {review.product?.sku || "MVS-001"}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-stone-200 rounded-full flex items-center justify-center">
                            <User className="h-3 w-3 text-stone-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-stone-900">{review.customerName}</p>
                            {review.isVerified && (
                              <Badge className="text-xs bg-green-100 text-green-800">Verified Purchase</Badge>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{renderStars(review.rating)}</td>
                      <td className="p-4">
                        <div className="max-w-xs">
                          {review.title && <p className="text-sm font-medium text-stone-900 mb-1">{review.title}</p>}
                          <p className="text-xs text-stone-600 truncate">{review.content}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center text-sm text-stone-700">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={`text-xs ${getStatusColor(review.status)}`}>{review.status}</Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-1">
                          {review.status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => handleUpdateStatus(review.id, "approved")}
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleUpdateStatus(review.id, "rejected")}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewReview(review)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              {review.status !== "approved" && (
                                <DropdownMenuItem onClick={() => handleUpdateStatus(review.id, "approved")}>
                                  <Check className="h-4 w-4 mr-2" />
                                  Approve
                                </DropdownMenuItem>
                              )}
                              {review.status !== "rejected" && (
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleUpdateStatus(review.id, "rejected")}
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  Reject
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Star className="h-12 w-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-stone-900 mb-2">No reviews found</h3>
              <p className="text-sm text-stone-500">
                {searchQuery || statusFilter !== "all" || ratingFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Customer reviews will appear here"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Review Dialog */}
      {selectedReview && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Review Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-stone-200 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-stone-600" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedReview.customerName}</p>
                    <div className="flex items-center space-x-2">
                      {renderStars(selectedReview.rating)}
                      <span className="text-xs text-stone-500">
                        {new Date(selectedReview.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(selectedReview.status)}>{selectedReview.status}</Badge>
              </div>

              <div className="border-t pt-4">
                <p className="font-medium mb-2">{selectedReview.title}</p>
                <p className="text-sm text-stone-600">{selectedReview.content}</p>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-2">Product</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-stone-100 rounded flex items-center justify-center">
                    <Package className="h-6 w-6 text-stone-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{selectedReview.product?.name || "Modern Velvet Sofa"}</p>
                    <p className="text-xs text-stone-500">SKU: {selectedReview.product?.sku || "MVS-001"}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                {selectedReview.status !== "approved" && (
                  <Button
                    variant="outline"
                    className="text-green-600 border-green-200 hover:bg-green-50"
                    onClick={() => {
                      handleUpdateStatus(selectedReview.id, "approved")
                      setIsViewDialogOpen(false)
                    }}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                )}
                {selectedReview.status !== "rejected" && (
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => {
                      handleUpdateStatus(selectedReview.id, "rejected")
                      setIsViewDialogOpen(false)
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                )}
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
