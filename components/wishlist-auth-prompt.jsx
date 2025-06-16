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
import { Heart, User, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export function WishlistAuthPrompt() {
  return (
    <Card className="border-stone-200 bg-gradient-to-br from-white to-stone-50/30">
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-accent1-100 flex items-center justify-center mx-auto mb-3">
          <Heart className="w-6 h-6 text-accent1-600" />
        </div>
        <CardTitle className="text-lg font-medium text-stone-900">
          Save Your Favorite Items
        </CardTitle>
        <CardDescription className="text-sm text-stone-600">
          Sign in to create your personal wishlist and never lose track of items
          you love
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Alert className="border-accent1-200 bg-accent1-50">
          <Star className="w-4 h-4" />
          <AlertDescription className="text-sm text-accent1-700">
            <strong>Create your wishlist:</strong> Save items, get notified of
            price drops, and share with friends!
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Link href="/auth/login" className="block">
            <Button className="w-full bg-accent2-600 hover:bg-accent2-700 text-white text-sm">
              <User className="w-4 h-4 mr-2" />
              Sign In to Save Items
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <Link href="/auth/register" className="block">
            <Button
              variant="outline"
              className="w-full border-stone-300 text-stone-700 hover:bg-stone-50 text-sm"
            >
              Create New Account
            </Button>
          </Link>
        </div>

        <div className="pt-3 border-t border-stone-100 text-center">
          <p className="text-xs text-stone-600 mb-2">
            Discover amazing products
          </p>
          <Link href="/products">
            <Button
              variant="ghost"
              className="text-accent2-600 hover:text-accent2-700 hover:bg-accent2-50 text-xs"
            >
              Browse Products
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
