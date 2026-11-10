
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import TokenDetails from "@/components/view-details/TokenDetails";

export default function ViewDetailsPage() {
    return (
        <main className="min-h-screen bg-muted/20">

            {/* Header */}
            <header className="border-b bg-background">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">

                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                            <Search className="h-5 w-5" />
                        </div>

                        <div>
                            <h1 className="font-bold">Astha Pass</h1>
                            <p className="text-xs text-muted-foreground">
                                Customer Details
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/get-token-link"
                        className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Link>

                </div>
            </header>

            {/* Content */}
            <div className="mx-auto max-w-5xl space-y-8 px-5 py-10">

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Customer Details
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Search and view customer token information.
                    </p>
                </div>

                <TokenDetails />

            </div>
        </main>
    );
}