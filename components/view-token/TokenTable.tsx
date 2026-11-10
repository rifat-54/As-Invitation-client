"use client"

import { Fragment, useEffect, useState } from "react"
import { getAllTokens, updateTokenStatus } from "@/action/token.action"
import { toast } from "sonner"
import Link from "next/link"

interface Token {
  id: string
  token: string
  email: string
  isValid: boolean
  totalToken: number
  usedToken: number
  createdAt: string
  updatedAt: string
}

export default function TokenTable() {
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null)
  const [copiedTokenId, setCopiedTokenId] = useState<string | null>(null)

  // Copy token
  const handleCopyToken = async (token: string, id: string) => {
    try {
      await navigator.clipboard.writeText(token)

      setCopiedTokenId(id)
      toast.success("Token copied successfully!")

      setTimeout(() => {
        setCopiedTokenId((current) => (current === id ? null : current))
      }, 2000)
    } catch {
      toast.error("Failed to copy token")
    }
  }

  // Fetch all tokens
  const fetchTokens = async () => {
    try {
      setLoading(true)

      const result = await getAllTokens()

      if (result.success) {
        setTokens(result.data)
      } else {
        toast.error(result.message || "Failed to fetch tokens")
      }
    } catch {
      toast.error("Failed to fetch tokens")
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch and automatic refresh
  useEffect(() => {
    const loadTokens = async () => {
      try {
        const result = await getAllTokens()

        if (result.success) {
          setTokens(result.data)
        } else {
          toast.error(result.message || "Failed to fetch tokens")
        }
      } catch {
        toast.error("Failed to fetch tokens")
      } finally {
        setLoading(false)
      }
    }

    loadTokens()

    window.addEventListener("tokens-updated", loadTokens)

    return () => {
      window.removeEventListener("tokens-updated", loadTokens)
    }
  }, [])

  // Update token status
  const handleStatusChange = async (id: string, isValid: boolean) => {
    try {
      setUpdatingId(id)
      console.log("Updating token status for ID:", id, "to", isValid)
      const result = await updateTokenStatus(id, isValid)

      if (!result.success) {
        toast.error(result.message || "Failed to update token")
        return
      }

      setTokens((prev) =>
        prev.map((token) =>
          token.token === id
            ? {
                ...token,
                isValid,
                updatedAt: result.data?.updatedAt ?? new Date().toISOString(),
              }
            : token
        )
      )

      toast.success(
        isValid
          ? "Token activated successfully!"
          : "Token expired successfully!"
      )
    } catch (error) {
      console.error(error)
      toast.error("Failed to update token status")
    } finally {
      setUpdatingId(null)
    }
  }

  // Format date and time
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(date))
  }

  const validTokens = tokens.filter((t) => t.isValid).length
  const expiredTokens = tokens.filter((t) => !t.isValid).length

  const selectedToken = tokens.find((token) => token.id === selectedTokenId)

  const getInvitationUrl = (token: string) => {
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/token/canva-invitation/${token}`
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
 {/* Header */}
<div className="flex flex-wrap items-center justify-between gap-4">
  <div>
    <h1 className="text-2xl font-bold tracking-tight">
      Token Management
    </h1>

    <p className="mt-1 text-sm text-muted-foreground">
      Manage and monitor all customer tokens.
    </p>
  </div>

  <div className="flex items-center gap-2">
    <Link
      href="/view-details"
      className="rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
    >
      View Details
    </Link>

  <button
  onClick={fetchTokens}
  disabled={loading}
  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
>
  {loading ? "Refreshing..." : "↻ Refresh"}
</button>
  </div>
</div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border p-5">
          <p className="text-sm text-muted-foreground">Total Customers</p>

          <h2 className="mt-2 text-3xl font-bold">{tokens.length}</h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-muted-foreground">Valid Tokens</p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {validTokens}
          </h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-muted-foreground">Expired Tokens</p>

          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {expiredTokens}
          </h2>
        </div>
      </div>

      {/* Token Table */}
      <div className="overflow-hidden rounded-xl border">
        <div className="border-b p-5">
          <h2 className="font-semibold">All Customer Tokens</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {tokens.length} customers
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1250px] text-left text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-5 py-4 font-semibold">Customer Email</th>

                <th className="px-5 py-4 font-semibold">Status</th>

                <th className="px-5 py-4 font-semibold">Total Token</th>

                <th className="px-5 py-4 font-semibold">Used Token</th>

                <th className="px-5 py-4 font-semibold">Created At</th>

                <th className="px-5 py-4 font-semibold">Last Updated</th>

                <th className="px-5 py-4 text-center font-semibold">Action</th>

                <th className="px-5 py-4 font-semibold">Token</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-16 text-center text-muted-foreground"
                  >
                    Loading tokens...
                  </td>
                </tr>
              ) : tokens.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-16 text-center text-muted-foreground"
                  >
                    No tokens found.
                  </td>
                </tr>
              ) : (
                tokens.map((token) => (
                  <Fragment key={token.id}>
                    <tr className="transition hover:bg-muted/30">
                      {/* Email */}
                      <td className="px-5 py-4 font-medium whitespace-nowrap">
                        {token.email}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            token.isValid
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {token.isValid ? "Valid" : "Expired"}
                        </span>
                      </td>

                      {/* Total Token */}
                      <td className="px-5 py-4">{token.totalToken}</td>

                      {/* Used Token */}
                      <td className="px-5 py-4">{token.usedToken}</td>

                      {/* Created At */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="font-medium">
                          {formatDate(token.createdAt)}
                        </div>

                        <span className="text-xs text-muted-foreground">
                          Created
                        </span>
                      </td>

                      {/* Updated At */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="font-medium">
                          {formatDate(token.updatedAt)}
                        </div>

                        <span className="text-xs text-muted-foreground">
                          Last modified
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() =>
                            handleStatusChange(token.token, !token.isValid)
                          }
                          disabled={updatingId === token.id}
                          className={`min-w-[105px] rounded-lg px-3 py-2 text-xs font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
                            token.isValid
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          {updatingId === token.token
                            ? "Updating..."
                            : token.isValid
                              ? "Expire"
                              : "Make Valid"}
                        </button>
                      </td>

                      {/* View Token */}
                      <td className="px-5 py-4">
                        <button
                          onClick={() => {
                            setSelectedTokenId(token.id)
                            setCopiedTokenId(null)
                          }}
                          className="rounded-lg border px-3 py-2 text-xs font-medium transition hover:bg-muted"
                        >
                          View Token
                        </button>
                      </td>
                    </tr>
                  </Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Token Modal */}
      {selectedToken && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => {
            setSelectedTokenId(null)
            setCopiedTokenId(null)
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="token-modal-title"
            className="w-full max-w-xl space-y-5 rounded-2xl border bg-background p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 id="token-modal-title" className="text-lg font-bold">
                  Customer Token
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedToken.email}
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedTokenId(null)
                  setCopiedTokenId(null)
                }}
                className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
              >
                Close ✕
              </button>
            </div>

            {/* Token Display */}
            <div className="flex items-center gap-3 rounded-xl border bg-muted/50 p-4">
              <p className="min-w-0 flex-1 font-mono text-sm leading-6 break-all">
                {getInvitationUrl(selectedToken.token)}
              </p>

              <button
                onClick={() =>
                  handleCopyToken(
                    getInvitationUrl(selectedToken.token),
                    selectedToken.id
                  )
                }
                className={`shrink-0 rounded-lg px-4 py-2 text-xs font-semibold text-white transition ${
                  copiedTokenId === selectedToken.id
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-primary hover:bg-primary/90"
                }`}
              >
                {copiedTokenId === selectedToken.id ? "✓ Copied" : "Copy"}
              </button>
            </div>

            <p className="text-xs text-muted-foreground">
              Keep this token private. Anyone with access to it may be able to
              use the associated invitation.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
