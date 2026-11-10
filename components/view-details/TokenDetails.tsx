"use client";

import { getTokenInfo } from "@/action/token.action";
import { useState } from "react";

import { toast } from "sonner";

interface TokenDetailsType {
    id: string;
    url: string;
    token: string;
    isValid: boolean;
    email: string;
    totalToken: number;
    usedToken: number;
    createdAt: string;
    updatedAt: string;
}

export default function TokenDetails() {
    const [search, setSearch] = useState("");
    const [details, setDetails] = useState<TokenDetailsType | null>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    // Search token
    const handleSearch = async () => {
        if (!search.trim()) {
            toast.error("Please enter an email or token");
            return;
        }

        try {
            setLoading(true);
            setDetails(null);

            const result = await getTokenInfo(search.trim());

            if (!result.success) {
                toast.error(result.message || "Token not found");
                return;
            }

            setDetails(result.data);
            toast.success("Customer details fetched successfully!");
        } catch (error) {
            toast.error("Failed to fetch customer details");
        } finally {
            setLoading(false);
        }
    };

    // Copy invitation URL
    const handleCopy = async () => {
        if (!details?.url) return;

        try {
            await navigator.clipboard.writeText(details.url);

            setCopied(true);
            toast.success("Invitation URL copied!");

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch {
            toast.error("Failed to copy URL");
        }
    };

    // Format date
    const formatDate = (date: string) => {
        return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }).format(new Date(date));
    };

    return (
        <div className="mx-auto w-full max-w-4xl space-y-8">

            {/* Search Section */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm">

                <div className="mb-5">
                    <h2 className="text-xl font-bold">
                        Find Customer Details
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Search using a customer email address or token.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">

                    <input
                        type="text"
                        placeholder="Enter customer email or token..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch();
                        }}
                        className="h-12 flex-1 rounded-lg border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />

                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className="h-12 rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>

                </div>
            </div>

            {/* Customer Details */}
            {details && (
                <div className="space-y-5 rounded-2xl border bg-card p-6 shadow-sm">

                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-5">

                        <div>
                            <h2 className="text-xl font-bold">
                                Customer Information
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                {details.email}
                            </p>
                        </div>

                        <span
                            className={`rounded-full px-4 py-2 text-xs font-semibold ${
                                details.isValid
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {details.isValid ? "Valid" : "Expired"}
                        </span>

                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                        <div className="rounded-xl border p-4">
                            <p className="text-sm text-muted-foreground">
                                Total Tokens
                            </p>

                            <h3 className="mt-2 text-2xl font-bold">
                                {details.totalToken}
                            </h3>
                        </div>

                        <div className="rounded-xl border p-4">
                            <p className="text-sm text-muted-foreground">
                                Used Tokens
                            </p>

                            <h3 className="mt-2 text-2xl font-bold text-primary">
                                {details.usedToken}
                            </h3>
                        </div>

                        <div className="rounded-xl border p-4">
                            <p className="text-sm text-muted-foreground">
                                Garbage Tokens
                            </p>

                            <h3 className="mt-2 text-2xl font-bold text-green-600">
                                {Math.max(
                                    0,
                                    details.totalToken - details.usedToken
                                )}
                            </h3>
                        </div>

                    </div>

                    {/* Customer Information */}
                    <div className="space-y-4 rounded-xl border p-5">

                        <h3 className="font-semibold">
                            Account Information
                        </h3>

                        <div className="grid gap-4 sm:grid-cols-2">

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Customer Email
                                </p>

                                <p className="mt-1 break-all text-sm font-medium">
                                    {details.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Customer ID
                                </p>

                                <p className="mt-1 break-all font-mono text-xs">
                                    {details.id}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Created At
                                </p>

                                <p className="mt-1 text-sm font-medium">
                                    {formatDate(details.createdAt)}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Last Updated
                                </p>

                                <p className="mt-1 text-sm font-medium">
                                    {formatDate(details.updatedAt)}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Invitation URL */}
                    <div className="space-y-3 rounded-xl border p-5">

                        <h3 className="font-semibold">
                            Canva Invitation URL
                        </h3>

                        <div className="flex flex-col gap-3 sm:flex-row">

                            <div className="flex min-h-12 flex-1 items-center rounded-lg border bg-muted/50 px-3">
                                <p className="break-all text-sm">
                                    {details.url}
                                </p>
                            </div>

                            <button
                                onClick={handleCopy}
                                className={`rounded-lg px-5 py-3 text-sm font-semibold text-white transition ${
                                    copied
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-primary hover:bg-primary/90"
                                }`}
                            >
                                {copied ? "✓ Copied" : "Copy URL"}
                            </button>

                        </div>
                    </div>

                </div>
            )}

        </div>
    );
}