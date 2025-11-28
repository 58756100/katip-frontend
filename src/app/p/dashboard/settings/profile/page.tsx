// Settings UI – Profile Page (Light Mode Only)
// Uses ShadCN UI + TailwindCSS

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <Card className="border border-neutral-300 bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">

          {/* Username */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Username</label>
            <Input placeholder="Enter username" className="w-full" />
          </div>

          {/* First + Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium">First Name</label>
              <Input placeholder="First name" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium">Last Name</label>
              <Input placeholder="Last name" />
            </div>
          </div>

          {/* Region */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Region</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kenya">Kenya</SelectItem>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="germany">Germany</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Public Profile */}
          <Card className="border border-neutral-300 bg-white">
            <CardContent className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <p className="font-medium">Public Profile</p>
                <p className="text-sm text-neutral-500">Show your profile to the public</p>
              </div>
              <Switch />
            </CardContent>
          </Card>

          {/* Marketing */}
          <Card className="border border-neutral-300 bg-white">
            <CardContent className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <p className="font-medium">Marketing</p>
                <p className="text-sm text-neutral-500">Receive marketing & product updates</p>
              </div>
              <Switch />
            </CardContent>
          </Card>

          {/* Printable Kit */}
          <Card className="border border-neutral-300 bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Download Your Printable Kit</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center p-4 pt-0">
              <p className="text-sm text-neutral-600">Get a PDF to help promote your creator page.</p>
              <Button>Download PDF</Button>
            </CardContent>
          </Card>

          {/* Save Changes */}
          <div className="flex justify-end">
            <Button className="px-6">Save Changes</Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
