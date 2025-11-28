"use client";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";


export default function SecurityPage() {
return (
<div className="space-y-8">


{/* Two-Factor Authentication */}
<Card className="border border-neutral-300 bg-white">
<CardHeader>
<CardTitle className="text-xl font-semibold">Two-Factor Authentication</CardTitle>
</CardHeader>
<CardContent className="space-y-4">
<div className="flex items-center justify-between p-4 border rounded-lg">
<div>
<p className="font-medium">Two-factor authentication (2FA)</p>
<p className="text-sm text-neutral-500">Add an extra layer of security to your account.</p>
</div>
<Switch />
</div>
<Button variant="outline">Manage 2FA</Button>
</CardContent>
</Card>


{/* Devices Section */}
<Card className="border border-neutral-300 bg-white">
<CardHeader>
<CardTitle className="text-xl font-semibold">Devices</CardTitle>
</CardHeader>
<CardContent className="space-y-4">


{/* Device 1 */}
<div className="border p-4 rounded-lg space-y-1">
<p className="font-medium">iPhone 15 Pro • Safari</p>
<p className="text-sm text-neutral-600">Nairobi, Kenya • Last active 2h ago</p>
<p className="text-xs text-neutral-500">IP: 102.89.221.14</p>
<div className="pt-2"><Button variant="outline" className="text-sm">Sign Out</Button></div>
</div>


{/* Device 2 */}
<div className="border p-4 rounded-lg space-y-1">
<p className="font-medium">MacBook Pro • Chrome</p>
<p className="text-sm text-neutral-600">Nairobi, Kenya • Last active 20m ago</p>
<p className="text-xs text-neutral-500">IP: 102.89.221.14</p>
<div className="pt-2"><Button variant="outline" className="text-sm">Sign Out</Button></div>
</div>


{/* Device 3 */}
<div className="border p-4 rounded-lg space-y-1">
<p className="font-medium">Windows PC • Edge</p>
<p className="text-sm text-neutral-600">Mombasa, Kenya • Last active 1d ago</p>
<p className="text-xs text-neutral-500">IP: 154.78.33.19</p>
<div className="pt-2"><Button variant="destructive" className="text-sm">Revoke</Button></div>
</div>


</CardContent>
</Card>


{/* Danger Zone */}
<Card className="border border-red-300 bg-white">
<CardHeader>
<CardTitle className="text-xl font-semibold text-red-600">Danger Zone</CardTitle>
</CardHeader>
<CardContent className="space-y-4">
<p className="text-neutral-700 text-sm">Permanently delete your account and all associated data. This action cannot be undone.</p>
<Button variant="destructive">Delete Account</Button>
</CardContent>
</Card>


</div>
);
}