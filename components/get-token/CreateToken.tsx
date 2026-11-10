import GetTokenForm from "./get-token-form";


export default function CreateToken() {
    return (
        <main className="container mx-auto px-4 py-12">
            <div className="mx-auto mb-8 max-w-xl">
                <h1 className="text-2xl font-bold">
                    Generate Canva Invitation
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Enter your customer email to generate an invitation link.
                </p>
            </div>

            <GetTokenForm />
        </main>
    );
}