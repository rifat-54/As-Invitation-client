"use client";

import Link from "next/link";
import { ArrowLeft, KeyRound } from "lucide-react";

export default function ManageToken() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-10 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <KeyRound className="h-8 w-8" />
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight">
          Manage Tokens
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Your Manage Token page is ready.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}