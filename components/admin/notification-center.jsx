"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  Check,
  Trash2,
  ShoppingCart,
  Package,
  User,
  Star,
  Info,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotificationStore } from "@/lib/notification-store";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function NotificationCenter() {
  const router = useRouter();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAllNotifications,
  } = useNotificationStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Simulate receiving real-time notifications
  useEffect(() => {
    const demoNotifications = [
      {
        type: "order",
        title: "New Order Received",
        message: "Order #BI-2024-0089 for $349.99 has been placed",
        link: "/admin/orders/89",
        severity: "medium",
      },
      {
        type: "inventory",
        title: "Low Stock Alert",
        message: "Modern Velvet Sofa is running low (2 remaining)",
        link: "/admin/inventory",
        severity: "high",
      },
    ];

    const timer = setTimeout(() => {
      if (Math.random() > 0.5) {
        const randomNotification =
          demoNotifications[
            Math.floor(Math.random() * demoNotifications.length)
          ];
        useNotificationStore.getState().addNotification(randomNotification);
      }
    }, 45000);

    return () => clearTimeout(timer);
  }, [notifications]);

  const filteredNotifications = notifications.filter(
    (notification) => activeTab === "all" || notification.type === activeTab
  );

  const getNotificationIcon = (type) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="h-4 w-4" />;
      case "inventory":
        return <Package className="h-4 w-4" />;
      case "customer":
        return <User className="h-4 w-4" />;
      case "review":
        return <Star className="h-4 w-4" />;
      case "system":
        return <Info className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-amber-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-stone-500";
    }
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    if (notification.link) {
      router.push(notification.link);
    }
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs"
              variant="destructive"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 md:w-96">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Notifications</h3>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="h-8 text-xs"
              >
                <Check className="h-3.5 w-3.5 mr-1" />
                Mark all read
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllNotifications}
              className="h-8 text-xs"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Clear all
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value)}
        >
          <div className="px-2 pt-2">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1 text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="order" className="flex-1 text-xs">
                Orders
              </TabsTrigger>
              <TabsTrigger value="inventory" className="flex-1 text-xs">
                Inventory
              </TabsTrigger>
              <TabsTrigger value="customer" className="flex-1 text-xs">
                Customers
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <ScrollArea className="h-[300px]">
              {filteredNotifications.length > 0 ? (
                <div>
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "flex items-start gap-3 p-3 border-b last:border-0 cursor-pointer hover:bg-stone-50",
                        !notification.isRead && "bg-stone-50"
                      )}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div
                        className={cn(
                          "mt-1 h-2 w-2 rounded-full",
                          !notification.isRead
                            ? getSeverityColor(notification.severity)
                            : "bg-transparent"
                        )}
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={cn(
                                "p-1 rounded-full",
                                notification.type === "order" &&
                                  "bg-blue-100 text-blue-700",
                                notification.type === "inventory" &&
                                  "bg-amber-100 text-amber-700",
                                notification.type === "customer" &&
                                  "bg-green-100 text-green-700",
                                notification.type === "review" &&
                                  "bg-purple-100 text-purple-700",
                                notification.type === "system" &&
                                  "bg-stone-100 text-stone-700"
                              )}
                            >
                              {getNotificationIcon(notification.type)}
                            </span>
                            <p className="text-sm font-medium">
                              {notification.title}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation();
                                clearNotification(notification.id);
                              }}
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-stone-600">
                          {notification.message}
                        </p>
                        <p className="text-xs text-stone-400">
                          {new Date(notification.createdAt).toLocaleString(
                            undefined,
                            {
                              timeStyle: "short",
                              dateStyle: "short",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-8">
                  <Bell className="h-10 w-10 text-stone-300 mb-2" />
                  <p className="text-sm text-stone-500">No notifications</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-sm font-medium">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
