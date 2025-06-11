import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-lg font-medium text-stone-800 mb-1">Contact Us</h1>
        <p className="text-xs text-stone-600">Get in touch with our team</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card className="rounded-sm border-stone-100">
          <CardHeader className="p-4">
            <CardTitle className="text-sm">Send us a message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="firstName" className="text-xs">
                  First Name
                </Label>
                <Input id="firstName" className="h-8 text-xs rounded-sm" />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-xs">
                  Last Name
                </Label>
                <Input id="lastName" className="h-8 text-xs rounded-sm" />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="text-xs">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="h-8 text-xs rounded-sm"
              />
            </div>
            <div>
              <Label htmlFor="subject" className="text-xs">
                Subject
              </Label>
              <Input id="subject" className="h-8 text-xs rounded-sm" />
            </div>
            <div>
              <Label htmlFor="message" className="text-xs">
                Message
              </Label>
              <Textarea id="message" rows={4} className="text-xs rounded-sm" />
            </div>
            <Button className="w-full bg-stone-800 hover:bg-stone-700 h-8 text-xs rounded-sm">
              Send Message
            </Button>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-4">
          <Card className="rounded-sm border-stone-100">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-stone-800 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-stone-800">Address</p>
                  <p className="text-xs text-stone-600">
                    123 Design Street
                    <br />
                    Creative City, CC 12345
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-stone-800 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-stone-800">Phone</p>
                  <p className="text-xs text-stone-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-stone-800 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-stone-800">Email</p>
                  <p className="text-xs text-stone-600">
                    hello@beautifyinterior.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-stone-800 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-stone-800">
                    Business Hours
                  </p>
                  <p className="text-xs text-stone-600">
                    Mon - Fri: 9:00 AM - 6:00 PM
                    <br />
                    Sat - Sun: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-sm border-stone-100">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">FAQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              <div>
                <p className="text-xs font-medium text-stone-800 mb-1">
                  What is your return policy?
                </p>
                <p className="text-xs text-stone-600">
                  We offer a 30-day return policy for all items in original
                  condition.
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-stone-800 mb-1">
                  Do you offer international shipping?
                </p>
                <p className="text-xs text-stone-600">
                  Yes, we ship worldwide. Shipping costs vary by location.
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-stone-800 mb-1">
                  How can I track my order?
                </p>
                <p className="text-xs text-stone-600">
                  You'll receive a tracking number via email once your order
                  ships.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
