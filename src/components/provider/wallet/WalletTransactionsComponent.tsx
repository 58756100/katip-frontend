"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  fetchProviderTransactions,
  ProviderTransaction,
} from "@/utils/providerTransactionUtils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { format } from "date-fns";

export const ProviderWalletTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<ProviderTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await fetchProviderTransactions();
      setTransactions(res); // <-- ensure you use res.data (array)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const columns = useMemo<ColumnDef<ProviderTransaction>[]>(
    () => [
      { accessorKey: "transactionUID", header: "Transaction ID" },
      { accessorKey: "payerId", header: "From (Payer)" },
      { accessorKey: "type", header: "Type" },
      {
        accessorKey: "amountMinor",
        header: "Amount",
        cell: ({ row }) =>
          `${(row.original.amountMinor / 100).toFixed(2)} ${
            row.original.currency
          }`,
      },
      { accessorKey: "method", header: "Method" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => row.original.status.toString(),
      },
      {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) =>
          format(new Date(row.original.createdAt), "dd MMM yyyy HH:mm"),
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    if (!search) return transactions;
    return transactions.filter(
      (tx) =>
        tx.transactionUID.includes(search) ||
        tx.type.toLowerCase().includes(search.toLowerCase()) ||
        (tx.payerId?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
        tx.method.toLowerCase().includes(search.toLowerCase()) ||
        tx.status.toLowerCase().includes(search.toLowerCase())
    );
  }, [transactions, search]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className=" w-full px-5 space-y-4">
      {/* Search & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <Input
          placeholder="Search transactions"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={fetchTransactions} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <Table className="min-w-[700px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-2">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
