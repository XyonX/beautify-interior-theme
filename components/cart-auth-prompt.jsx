"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, ShoppingCart, ArrowRight, Gift } from "lucide-react";
import Link from "next/link";

export function CartAuthPrompt() {
  return (
    <Card className="border-stone-200 bg-gradient-to-br from-white to-stone-50/30">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-accent2-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingCart className="w-8 h-8 text-accent2-600" />
        </div>
        <CardTitle className="text-xl font-semibold text-stone-900">
          Sign In to Continue Shopping
        </CardTitle>
        <CardDescription className="text-stone-600">
          Create an account or sign in to save your cart and enjoy a
          personalized shopping experience
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Alert className="border-accent3-200 bg-accent3-50">
          <Gift className="w-4 h-4" />
          <AlertDescription className="text-accent3-700">
            <strong>Benefits of signing in:</strong> Save your cart, track
            orders, faster checkout, and exclusive offers!
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          <Link href="/auth/login" className="block">
            <Button className="w-full bg-accent2-600 hover:bg-accent2-700 text-white">
              <User className="w-4 h-4 mr-2" />
              Sign In to Your Account
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <Link href="/auth/register" className="block">
            <Button
              variant="outline"
              className="w-full border-stone-300 text-stone-700 hover:bg-stone-50"
            >
              Create New Account
            </Button>
          </Link>
        </div>

        <div className="pt-4 border-t border-stone-100 text-center">
          <p className="text-sm text-stone-600 mb-3">
            Want to continue browsing?
          </p>
          <Link href="/products">
            <Button
              variant="ghost"
              className="text-accent2-600 hover:text-accent2-700 hover:bg-accent2-50"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
