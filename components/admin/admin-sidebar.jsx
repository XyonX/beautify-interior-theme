"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Layers,
  TrendingUp,
  FileText,
  UserCog,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    icon: Package,
    children: [
      { name: "All Products", href: "/admin/products" },
      { name: "Add Product", href: "/admin/products/new" },
      { name: "Categories", href: "/admin/categories" },
      { name: "Inventory", href: "/admin/inventory" },
      { name: "Variants", href: "/admin/products/variants" },
    ],
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
    badge: "3",
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    name: "Reports",
    href: "/admin/reports",
    icon: FileText,
    badge: "New",
  },
  {
    name: "Bulk Operations",
    href: "/admin/bulk-operations",
    icon: Layers,
  },
  {
    name: "Marketing",
    icon: TrendingUp,
    children: [
      { name: "Coupons", href: "/admin/coupons" },
      { name: "Reviews", href: "/admin/reviews" },
    ],
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: UserCog,
  },
  {
    name: "Settings",
    icon: Settings,
    children: [
      { name: "General", href: "/admin/settings" },
      { name: "Shipping", href: "/admin/shipping" },
    ],
  },
];

// interface AdminSidebarProps {
//   onItemClick?: () => void
// }

export function AdminSidebar({ onItemClick }) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState(["Products"]);

  const toggleExpanded = (name) => {
    setExpandedItems((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const handleItemClick = () => {
    onItemClick?.();
  };

  return (
    <div className="flex h-full w-full flex-col bg-white border-r border-stone-200">
      {/* Logo - Desktop Only */}
      <div className="hidden lg:flex h-16 items-center px-6 border-b border-stone-200 flex-shrink-0">
        <Link href="/admin" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">BI</span>
          </div>
          <span className="font-semibold text-stone-900">Admin Panel</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const isExpanded = expandedItems.includes(item.name);
          const hasChildren = item.children && item.children.length > 0;

          if (hasChildren) {
            return (
              <div key={item.name}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start px-3 py-2 text-left font-normal",
                    "hover:bg-stone-100"
                  )}
                  onClick={() => toggleExpanded(item.name)}
                >
                  <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                  <span className="flex-1 truncate">{item.name}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="ml-auto text-xs flex-shrink-0"
                    >
                      {item.badge}
                    </Badge>
                  )}
                  {isExpanded ? (
                    <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="ml-2 h-4 w-4 flex-shrink-0" />
                  )}
                </Button>
                {isExpanded && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={handleItemClick}
                      >
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start px-3 py-1.5 text-sm font-normal",
                            pathname === child.href
                              ? "bg-stone-100 text-stone-900"
                              : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                          )}
                        >
                          <span className="truncate">{child.name}</span>
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link key={item.name} href={item.href} onClick={handleItemClick}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start px-3 py-2 text-left font-normal",
                  pathname === item.href
                    ? "bg-stone-100 text-stone-900"
                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                )}
              >
                <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                <span className="flex-1 truncate">{item.name}</span>
                {item.badge && (
                  <Badge
                    variant="secondary"
                    className="ml-auto text-xs flex-shrink-0"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="border-t border-stone-200 p-4 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-stone-200 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-medium text-stone-700">JA</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-stone-900 truncate">
              Beautify Admin
            </p>
            <p className="text-xs text-stone-500 truncate">
              admin@beautifyinterior.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
