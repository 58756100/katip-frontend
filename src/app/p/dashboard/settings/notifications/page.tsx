import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NotificationsSettings() {
  return (
    <div className="w-full  mx-auto py-10 space-y-8">

      {/* Push Notifications */}
      <Card className="border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Push Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Enable push notifications</p>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Email Notifications */}
      <Card className="border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Email Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Tip Received</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Payout Status Updates</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Weekly Summary</span>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card className="border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Quiet Hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Set a time window where notifications are muted.</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground">Start</label>
              <Input type="time" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">End</label>
              <Input type="time" />
            </div>
          </div>
          <Button className="mt-2">Save Quiet Hours</Button>
        </CardContent>
      </Card>

      {/* Weekly Summary Configuration */}
      <Card className="border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Weekly Summary Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Choose when you want to receive your weekly summary email.</p>
          <select className="w-full border rounded-lg p-2 text-sm bg-background">
            <option>Every Monday</option>
            <option>Every Tuesday</option>
            <option>Every Wednesday</option>
            <option>Every Thursday</option>
            <option>Every Friday</option>
            <option>Every Saturday</option>
            <option>Every Sunday</option>
          </select>
          <Button className="mt-2">Save Preferences</Button>
        </CardContent>
      </Card>

      {/* Emergency Alerts */}
      <Card className="border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Emergency Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Receive emergency alerts about account security or suspicious activity.</p>
          <div className="flex items-center justify-between">
            <span className="text-sm">Enable Emergency Alerts</span>
            <Switch />
          </div>
        </CardContent>
      </Card>

    </div>
  );
}