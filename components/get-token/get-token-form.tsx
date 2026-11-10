"use client"

import { useState, useTransition } from "react"
import { createToken } from "@/action/token.action"
import { toast } from "sonner"

export default function GetTokenForm() {
  const [email, setEmail] = useState("")
  const [result, setResult] = useState("")
  const [isPending, startTransition] = useTransition()
  const [copied, setCopied] = useState(false)

  const handleSubmit = () => {
    if (!email.trim()) {
      toast.error("Please enter an email address")
      return
    }

    startTransition(async () => {
      try {
        const data = await createToken(email)

        if (!data.success) {
          toast.error(data.message || "Something went wrong")
          return
        }

        setResult(data.data.url)
        toast.success("Token generated successfully!")
            // Notify the token table
    window.dispatchEvent(new Event("tokens-updated"));

        setEmail("")
      } catch {
        toast.error("Failed to generate token")
      }
    })
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result)

      setCopied(true)
      toast.success("Invitation link copied!")

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      toast.error("Failed to copy link")
    }
  }

  const handleClear = () => {
    setResult("");
    setEmail("");
    setCopied(false);
};

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      {/* Email Input */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Customer Email</label>

        <div className="flex gap-2">
          <input
            type="email"
            placeholder="customer@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 flex-1 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="h-11 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {isPending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>

      {/* Generated Link */}


      {result && (
    <div className="space-y-3 rounded-xl border bg-card p-4">

        <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">
                Generated Invitation Link
            </h3>

            <div className="flex items-center gap-2">
                {/* <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    Generated
                </span> */}

               <button
    onClick={handleClear}
    className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-red-500"
>
    Clear Now
</button>
            </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg border bg-muted p-3">
            <p className="flex-1 break-all text-sm">
                {result}
            </p>

            <button
                onClick={handleCopy}
                className={`shrink-0 rounded-md px-3 py-2 text-xs font-medium text-white transition-all ${
                    copied
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-primary hover:bg-primary/90"
                }`}
            >
                {copied ? "✓ Copied" : "Copy"}
            </button>
        </div>
    </div>
)}

      
    </div>
  )
}
