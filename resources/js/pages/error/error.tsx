import { Head } from "@inertiajs/react";
import { ReactNode } from "react";
import AuthLayout from "@/layouts/auth-layout";

export default function Error() {
    return (
        <>
            <Head title="Error" />
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Error</h1>
            </div>
        </>
    )
}

Error.layout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>