// Settings UI – Overview Page (Light Mode Only)
// Uses ShadCN UI + TailwindCSS

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      {/* Overview Wrapper */}
      <Card className="border border-neutral-300 bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">

          {/* Username Edit */}
          <div className="border p-4 rounded-lg flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Username</p>
              <p className="text-sm text-neutral-500">Update your display username</p>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Enter username" className="w-40" />
              <Button>Save</Button>
            </div>
          </div>

          {/* QR Code Download */}
          <div className="border p-4 rounded-lg flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">QR Code</p>
              <p className="text-sm text-neutral-500">Download QR code to share your page</p>
            </div>
            <Button variant="outline">Download</Button>
          </div>

          {/* Payout Rails Management */}
          <div className="border p-4 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-medium">Payout Rails</p>
              <Button variant="outline">Manage</Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between border rounded-lg p-3">
                <p className="text-sm text-neutral-700">Bank - KCB **** 9120</p>
                <Button variant="secondary" className="text-xs">Edit</Button>
              </div>

              <div className="flex items-center justify-between border rounded-lg p-3">
                <p className="text-sm text-neutral-700">MPesa - 0745 *** 221</p>
                <Button variant="secondary" className="text-xs">Edit</Button>
              </div>
            </div>
          </div>

          {/* Security - Logged-in Devices */}
          <div className="border p-4 rounded-lg space-y-4">
            <p className="font-medium">Security Devices</p>

            {[
              "iPhone 14 Pro - Nairobi, Kenya",
              "Windows PC - Chrome Browser",
              "MacBook Air M2 - Safari Browser",
            ].map((device, index) => (
              <div key={index} className="flex items-center justify-between border p-3 rounded-lg">
                <p className="text-sm text-neutral-700">{device}</p>
                <Button variant="destructive" className="text-xs">Remove</Button>
              </div>
            ))}
          </div>

          {/* Notifications */}
          <div className="border p-4 rounded-lg flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Notifications</p>
              <p className="text-sm text-neutral-500">Manage your alerts and reminders</p>
            </div>
            <Button>Configure</Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
