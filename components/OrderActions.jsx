"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Download, Share2 } from "lucide-react";
import Link from "next/link";

export default function OrderActions({ orderData }) {
  const handleDownloadReceipt = () => {
    alert("Receipt download would be implemented here");
  };

  const handleShareOrder = () => {
    const url = window.location.href;
    const orderNumber = orderData.order_number;

    if (navigator.share) {
      navigator.share({
        title: "My BeautifyInterior Order",
        text: `I just ordered from BeautifyInterior! Order #${orderNumber}`,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Order link copied to clipboard!");
    }
  };

  return (
    <Card className="rounded-sm border-stone-100">
      <CardHeader className="p-4">
        <CardTitle className="text-sm">Order Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <Link href={`/order-tracking?order=${orderData.order_number}`}>
          <Button className="w-full bg-stone-800 hover:bg-stone-700 text-xs rounded-sm h-8">
            <MapPin className="h-3 w-3 mr-1" />
            Track Order
          </Button>
        </Link>
        <Button
          onClick={handleDownloadReceipt}
          variant="outline"
          className="w-full text-xs rounded-sm h-8"
        >
          <Download className="h-3 w-3 mr-1" />
          Download Receipt
        </Button>
        <Button
          onClick={handleShareOrder}
          variant="outline"
          className="w-full text-xs rounded-sm h-8"
        >
          <Share2 className="h-3 w-3 mr-1" />
          Share Order
        </Button>
      </CardContent>
    </Card>
  );
}
