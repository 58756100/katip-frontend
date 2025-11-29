"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitBecomeProvider } from "@/utils/becomeProviderUtils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function BecomeProviderForm() {
  const [fullName, setFullName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);

  const roles = ["Waiter", "DJ", "Barber", "Bouncer", "Other"];

  const resetForm = () => {
    setFullName("");
    setBrandName("");
    setBio("");
    setRole("");
    setAvatar(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !role) {
      toast.error("Please fill in required fields.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        displayName: brandName || fullName,
        serviceCategory: role,
        bio,
      };

      const response = await submitBecomeProvider(payload);
      console.log("Become Provider Success:", response);
      toast.success("You are now a provider!");
      resetForm();
    } catch (err: any) {
      console.error("BecomeProvider form submit ERROR:", err);
      toast.error(err.message || "Failed to submit form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="provider-form" onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Details */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Personal Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brandName">Stage / Brand Name</Label>
            <Input
              id="brandName"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
          </div>
        </div>

        {/* Avatar Preview */}
        <div className="space-y-2">
          <Label>Profile Picture</Label>
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              {avatar ? (
                <AvatarImage src={URL.createObjectURL(avatar)} alt="Avatar" />
              ) : (
                <AvatarFallback>Upload</AvatarFallback>
              )}
            </Avatar>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files?.[0] || null)}
            />
          </div>
        </div>
      </div>

      {/* Business Details */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Business / Role Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role / Type of Provider *</Label>
            <Select value={role} onValueChange={setRole} required>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Short Bio</Label>
            <Input
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Processing..." : "Become a Provider"}
      </Button>
    </form>
  );
}
