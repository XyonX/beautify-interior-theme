"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !subject || !message) {
      setFeedback("All fields are required.");
      return;
    }

    try {
      setSubmitting(true);
      const name = `${firstName} ${lastName}`;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, subject, message }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to submit form.");
      }

      setFeedback("Your message has been sent successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Form submission error:", error);
      setFeedback("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
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
                <Input
                  id="firstName"
                  className="h-8 text-xs rounded-sm"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-xs">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  className="h-8 text-xs rounded-sm"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="subject" className="text-xs">
                Subject
              </Label>
              <Input
                id="subject"
                className="h-8 text-xs rounded-sm"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="message" className="text-xs">
                Message
              </Label>
              <Textarea
                id="message"
                rows={4}
                className="text-xs rounded-sm"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            {feedback && <p className="text-xs text-red-600">{feedback}</p>}
            <Button
              className="w-full bg-stone-800 hover:bg-stone-700 h-8 text-xs rounded-sm"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Send Message"}
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
                    109, netaji nagar,vip nagar
                    <br />
                    kolkata,700100
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-stone-800 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-stone-800">Phone</p>
                  <p className="text-xs text-stone-600">+91 988-360-8843</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-stone-800 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-stone-800">Email</p>
                  <p className="text-xs text-stone-600">
                    beautifyinterior@gmail.com
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
                  We do not accept general returns. However, if your item
                  arrives damaged or incorrect, you can request a refund within
                  48 hours of delivery by providing clear photos and order
                  details.
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-stone-800 mb-1">
                  Do you offer international shipping?
                </p>
                <p className="text-xs text-stone-600">
                  Yes, we ship worldwide. International delivery may take 15–30
                  business days depending on the destination.
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-stone-800 mb-1">
                  How can I track my order?
                </p>
                <p className="text-xs text-stone-600">
                  A tracking number will be sent to your email once your order
                  is shipped. You can use this to monitor the delivery status.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
