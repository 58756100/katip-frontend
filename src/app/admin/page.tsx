"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --------------------
// TYPES
// --------------------

interface AdminUser {
  id: string;
  name?: string;
  email: string;
  roles: string[];
  customerWalletMinor: number;
  providerWalletMinor: number;
  totalBalanceMinor: number;
}

interface SummaryData {
  totalUsers: number;
  totalProviders: number;
  totalCustomers: number;
  totalSystemBalanceMinor: number;
}

interface AdminUsersResponse {
  users: AdminUser[];
  summary: SummaryData;
}

// --------------------
// COMPONENT
// --------------------

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [summary, setSummary] = useState<SummaryData | null>(null);

  const loadAdminUsers = async () => {
    try {
      const res = await axios.get<AdminUsersResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/users`
      );

      setUsers(res.data.users);
      setSummary(res.data.summary);
    } catch (error) {
      console.error("Failed to load admin users:", error);
    }
  };

  useEffect(() => {
    loadAdminUsers();
  }, []);

  return (
    <div className="space-y-6">

      {/* SUMMARY CARDS */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader><CardTitle>Total Users</CardTitle></CardHeader>
            <CardContent className="text-3xl font-bold">{summary.totalUsers}</CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Providers</CardTitle></CardHeader>
            <CardContent className="text-3xl font-bold">{summary.totalProviders}</CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Customers</CardTitle></CardHeader>
            <CardContent className="text-3xl font-bold">{summary.totalCustomers}</CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Total Wallet Balances</CardTitle></CardHeader>
            <CardContent className="text-3xl font-bold">
              {(summary.totalSystemBalanceMinor / 100).toLocaleString()} KSh
            </CardContent>
          </Card>
        </div>
      )}

      {/* USERS TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg">
              <thead className="bg-muted text-left text-sm">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Roles</th>
                  <th className="p-3">Customer Wallet</th>
                  <th className="p-3">Provider Wallet</th>
                  <th className="p-3">Total Balance</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b hover:bg-muted/40">
                    <td className="p-3 font-medium">{u.name || "(No name)"}</td>
                    <td className="p-3">{u.email}</td>

                    <td className="p-3">
                      {u.roles.map((r) => (
                        <Badge key={r} variant="outline" className="mr-1">
                          {r}
                        </Badge>
                      ))}
                    </td>

                    <td className="p-3 font-semibold">
                      {(u.customerWalletMinor / 100).toLocaleString()} KSh
                    </td>

                    <td className="p-3 font-semibold">
                      {(u.providerWalletMinor / 100).toLocaleString()} KSh
                    </td>

                    <td className="p-3 font-bold">
                      {(u.totalBalanceMinor / 100).toLocaleString()} KSh
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
