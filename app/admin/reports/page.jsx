"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Download, FileText, BarChart, LineChart, PieChart, Clock } from "lucide-react"
import { mockOrders, mockProducts, mockCustomers } from "@/lib/mock-data"

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("sales")
  const [reportType, setReportType] = useState("summary")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })
  const [fileFormat, setFileFormat] = useState("pdf")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isScheduling, setIsScheduling] = useState(false)
  const [scheduleFrequency, setScheduleFrequency] = useState("weekly")
  const [scheduleEmail, setScheduleEmail] = useState("")
  const [includeCharts, setIncludeCharts] = useState(true)
  const [includeDetails, setIncludeDetails] = useState(true)

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    // In a real app, this would trigger a download or open a new tab
    alert("Report generated successfully!")
  }

  const handleScheduleReport = async () => {
    setIsScheduling(true)
    // Simulate scheduling
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsScheduling(false)
    alert("Report scheduled successfully!")
  }

  // Calculate some metrics for the preview
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = mockOrders.length
  const averageOrderValue = totalRevenue / totalOrders
  const topProducts = mockProducts
    .slice(0, 5)
    .map((product) => ({ name: product.name, revenue: product.price * (Math.floor(Math.random() * 10) + 1) }))
    .sort((a, b) => b.revenue - a.revenue)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Reports</h1>
          <p className="text-sm text-stone-600">Generate and schedule detailed business reports</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Sales
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Customers
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Scheduled
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Configuration */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Report Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="reportType">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Summary Report</SelectItem>
                    <SelectItem value="detailed">Detailed Report</SelectItem>
                    <SelectItem value="analytics">Analytics Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Date Range</Label>
                <div className="flex flex-col space-y-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={(range) => setDateRange(range as any)}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label htmlFor="fileFormat">File Format</Label>
                <Select value={fileFormat} onValueChange={setFileFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="xlsx">Excel Spreadsheet</SelectItem>
                    <SelectItem value="csv">CSV File</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Options</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="includeCharts" checked={includeCharts} onCheckedChange={setIncludeCharts as any} />
                  <label htmlFor="includeCharts" className="text-sm">
                    Include charts and graphs
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="includeDetails" checked={includeDetails} onCheckedChange={setIncludeDetails as any} />
                  <label htmlFor="includeDetails" className="text-sm">
                    Include detailed breakdowns
                  </label>
                </div>
              </div>

              <Button onClick={handleGenerateReport} disabled={isGenerating} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                {isGenerating ? "Generating..." : "Generate Report"}
              </Button>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Schedule This Report</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="scheduleFrequency">Frequency</Label>
                    <Select value={scheduleFrequency} onValueChange={setScheduleFrequency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="scheduleEmail">Email Recipients</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="scheduleEmail"
                        placeholder="email@example.com"
                        value={scheduleEmail}
                        onChange={(e) => setScheduleEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleScheduleReport}
                    disabled={isScheduling || !scheduleEmail}
                    className="w-full"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    {isScheduling ? "Scheduling..." : "Schedule Report"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report Preview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Report Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <TabsContent value="sales" className="mt-0">
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4">Sales Report</h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="space-y-1">
                        <p className="text-sm text-stone-500">Total Revenue</p>
                        <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-stone-500">Total Orders</p>
                        <p className="text-2xl font-bold">{totalOrders}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-stone-500">Average Order Value</p>
                        <p className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-stone-500">Conversion Rate</p>
                        <p className="text-2xl font-bold">3.2%</p>
                      </div>
                    </div>

                    <h4 className="font-medium mb-2">Sales by Month</h4>
                    <div className="h-64 bg-stone-100 rounded-lg flex items-center justify-center mb-6">
                      <BarChart className="h-8 w-8 text-stone-400" />
                      <span className="ml-2 text-stone-500">Chart Preview</span>
                    </div>

                    <h4 className="font-medium mb-2">Top Products by Revenue</h4>
                    <div className="space-y-2">
                      {topProducts.map((product, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-stone-50 rounded">
                          <span className="text-sm">{product.name}</span>
                          <span className="text-sm font-medium">${product.revenue.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="products" className="mt-0">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-4">Product Performance Report</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="space-y-1">
                      <p className="text-sm text-stone-500">Total Products</p>
                      <p className="text-2xl font-bold">{mockProducts.length}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-stone-500">Out of Stock</p>
                      <p className="text-2xl font-bold">
                        {mockProducts.filter((p) => p.trackQuantity && p.quantity === 0).length}
                      </p>
                    </div>
                  </div>

                  <h4 className="font-medium mb-2">Sales by Category</h4>
                  <div className="h-64 bg-stone-100 rounded-lg flex items-center justify-center mb-6">
                    <PieChart className="h-8 w-8 text-stone-400" />
                    <span className="ml-2 text-stone-500">Chart Preview</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="customers" className="mt-0">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-4">Customer Analysis Report</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="space-y-1">
                      <p className="text-sm text-stone-500">Total Customers</p>
                      <p className="text-2xl font-bold">{mockCustomers.length}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-stone-500">New Customers</p>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-stone-500">Repeat Purchase Rate</p>
                      <p className="text-2xl font-bold">42%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-stone-500">Customer Lifetime Value</p>
                      <p className="text-2xl font-bold">$840</p>
                    </div>
                  </div>

                  <h4 className="font-medium mb-2">Customer Growth</h4>
                  <div className="h-64 bg-stone-100 rounded-lg flex items-center justify-center">
                    <LineChart className="h-8 w-8 text-stone-400" />
                    <span className="ml-2 text-stone-500">Chart Preview</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="scheduled" className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <FileText className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">Weekly Sales Report</h4>
                        <p className="text-sm text-stone-500">Every Monday at 8:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <FileText className="h-5 w-5 text-green-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">Monthly Inventory Report</h4>
                        <p className="text-sm text-stone-500">1st of every month at 9:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-full">
                        <FileText className="h-5 w-5 text-purple-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">Quarterly Performance Report</h4>
                        <p className="text-sm text-stone-500">Last day of each quarter</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </div>
      </Tabs>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-stone-100 rounded-full">
                  <FileText className="h-5 w-5 text-stone-700" />
                </div>
                <div>
                  <h4 className="font-medium">Sales Summary Report</h4>
                  <p className="text-sm text-stone-500">Generated on {format(new Date(), "MMM d, yyyy")}</p>
                </div>
              </div>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-stone-100 rounded-full">
                  <FileText className="h-5 w-5 text-stone-700" />
                </div>
                <div>
                  <h4 className="font-medium">Customer Analysis Report</h4>
                  <p className="text-sm text-stone-500">
                    Generated on {format(new Date(Date.now() - 86400000), "MMM d, yyyy")}
                  </p>
                </div>
              </div>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-stone-100 rounded-full">
                  <FileText className="h-5 w-5 text-stone-700" />
                </div>
                <div>
                  <h4 className="font-medium">Inventory Status Report</h4>
                  <p className="text-sm text-stone-500">
                    Generated on {format(new Date(Date.now() - 172800000), "MMM d, yyyy")}
                  </p>
                </div>
              </div>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
