"use client";

import { addLink } from "@/action/token.action";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Home, KeyRound } from "lucide-react";

export default function AddLink() {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!link.trim()) {
      toast.error("Please enter a link");
      return;
    }

    try {
      new URL(link.trim());
    } catch {
      toast.error("Please enter a valid URL");
      return;
    }

    setLoading(true);

    console.log("Submitting link:", link.trim());

    try {
      const result = await addLink(link.trim());

      if (!result.success) {
        toast.error(result.message || "Failed to add link");
        return;
      }

      toast.success(result.message || "Link added successfully!");
      setLink("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-200/50">

      {/* Header */}
      <div className="border-b border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 px-7 py-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              Add New Invitation Link
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Add a Canva invitation link to your collection.
            </p>
          </div>
        </div>
      </div>

<div className="mt-5 grid grid-cols-2 gap-3">
  <Link
    href="/"
    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
  >
    <Home className="h-4 w-4" />
    Go Home
  </Link>

  <Link
    href="/get-token-link"
    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
  >
    <KeyRound className="h-4 w-4" />
    Generate Invitation
  </Link>
</div>

      {/* Form */}
      <div className="p-7">
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="link"
                className="text-sm font-semibold text-gray-800"
              >
                Invitation URL
              </label>

              <span className="text-xs text-gray-400">
                Required
              </span>
            </div>

            <div className="group flex items-center rounded-xl border border-gray-200 bg-gray-50 transition-all duration-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
              <div className="pl-4 text-gray-400 transition-colors group-focus-within:text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>

              <input
                id="link"
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://www.canva.com/..."
                disabled={loading}
                className="w-full bg-transparent px-3 py-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed"
              />

              {link && (
                <button
                  type="button"
                  onClick={() => setLink("")}
                  disabled={loading}
                  className="mr-3 rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-200 hover:text-gray-700"
                  aria-label="Clear link"
                >
                  ✕
                </button>
              )}
            </div>

            <p className="mt-2 text-xs text-gray-400">
              Paste your Canva invitation URL here.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !link.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            {loading ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
                  />
                </svg>
                Adding Invitation...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                Add Invitation Link
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-5 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#16a34a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
            <path d="m9 12 2 2 4-4" />
          </svg>

          <p className="text-xs font-medium text-green-700">
            Your invitation link will be securely saved.
          </p>
        </div>
      </div>
    </div>
  );
}