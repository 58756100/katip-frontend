// Settings UI – Payouts Page (Light Mode Only)
// Uses ShadCN UI + TailwindCSS

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PayoutsPage() {
  return (
    <div className="space-y-8">
      <Card className="border border-neutral-300 bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Payout Rails</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Default Rail */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <p className="font-medium">Default Rail</p>
              <p className="text-sm text-neutral-500">USD – Bank Transfer</p>
            </div>
            <Button variant="outline">Change</Button>
          </div>

          {/* Destination List */}
          <div className="space-y-4">
            <p className="font-medium text-lg">Destinations</p>

            {/* Destination Card 1 */}
            <div className="border p-4 rounded-lg space-y-3">
              <p className="font-medium">MPESA – +254 700 123 456</p>
              <div className="flex gap-3">
                <Button variant="outline" className="text-sm">Edit</Button>
                <Button variant="destructive" className="text-sm">Remove</Button>
              </div>
            </div>

            {/* Destination Card 2 */}
            <div className="border p-4 rounded-lg space-y-3">
              <p className="font-medium">PayPal – creator@example.com</p>
              <div className="flex gap-3">
                <Button variant="outline" className="text-sm">Edit</Button>
                <Button variant="destructive" className="text-sm">Remove</Button>
              </div>
            </div>

            {/* Destination Card 3 */}
            <div className="border p-4 rounded-lg space-y-3">
              <p className="font-medium">Bank – Chase •••• 4920</p>
              <div className="flex gap-3">
                <Button variant="outline" className="text-sm">Edit</Button>
                <Button variant="destructive" className="text-sm">Remove</Button>
              </div>
            </div>
          </div>

          {/* Add Destination */}
          <Button className="w-fit">Add Destination</Button>

          {/* Limits & Eligibility */}
          <Card className="border border-neutral-300 bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Limits & Eligibility</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between p-4 pt-0">
              <p className="text-sm text-neutral-600 max-w-sm">
                View details about payout schedules, verification requirements, and withdrawal thresholds.
              </p>
              <Button variant="outline">View Details</Button>
            </CardContent>
          </Card>

        </CardContent>
      </Card>
    </div>
  );
}