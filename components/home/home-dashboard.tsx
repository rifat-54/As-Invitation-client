
"use client";

import Link from "next/link";
import {
    KeyRound,
    Users,
    ArrowUpRight,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HomeDashboard() {
    return (
        <main className="min-h-svh bg-background px-5 py-12 md:px-10">

            <div className="mx-auto max-w-5xl space-y-10">

                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <KeyRound className="h-6 w-6" />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold tracking-tight">
                            Astha Pass
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Admin Dashboard
                        </p>
                    </div>
                </div>

                {/* Welcome */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        <Sparkles className="h-4 w-4" />
                        Welcome Back
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                        Manage your Canva subscriptions.
                    </h2>

                    <p className="max-w-xl text-muted-foreground">
                        Generate customer invitation links and manage
                        existing customer tokens from one place.
                    </p>
                </section>

                {/* Navigation Cards */}
                <section className="grid gap-5 md:grid-cols-2">

                    {/* Generate Token */}
                    <div className="group rounded-2xl border p-6 transition-all hover:border-primary/50 hover:shadow-lg">
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <KeyRound className="h-6 w-6" />
                        </div>

                        <h3 className="text-xl font-semibold">
                            Generate Invitation
                        </h3>

                        <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">
                            Generate unique customer invitation links
                            using their email address.
                        </p>

                        <Button asChild className="mt-6 w-full">
                            <Link href="/get-token-link">
                                Generate Token
                                <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    {/* Manage Tokens */}
                    <div className="group rounded-2xl border p-6 transition-all hover:border-primary/50 hover:shadow-lg">
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
                            <Users className="h-6 w-6" />
                        </div>

                        <h3 className="text-xl font-semibold">
                            Manage Customers
                        </h3>

                        <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">
                            View customer tokens, check their status,
                            and activate or expire invitations.
                        </p>

                        <Button asChild variant="outline" className="mt-6 w-full">
                            <Link href="/manage-customer">
                                View All Tokens
                                <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                </section>

                {/* Footer Info */}
                <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-4">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-green-600" />

                    <p className="text-xs leading-5 text-muted-foreground">
                        Astha Pass Management System. Manage your customer
                        invitations securely from your dashboard.
                    </p>
                </div>

                <footer className="border-t pt-5 text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Astha Pass. All rights reserved.
                </footer>

            </div>
        </main>
    );
}
