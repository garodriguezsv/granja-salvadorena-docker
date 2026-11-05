import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import { getCurrentUser } from "@/services/authService";

export const dynamic = "force-dynamic";

export default async function CuentaPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <main className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-900">
                    Mi cuenta
                </h1>

                <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <p>
                        <strong>Nombre:</strong> {user.name}
                    </p>

                    <p className="mt-2">
                        <strong>Email:</strong> {user.email}
                    </p>

                    <p className="mt-2">
                        <strong>ID:</strong> {user.id}
                    </p>

                    <div className="mt-6">
                        <LogoutButton />
                    </div>
                </div>

            </div>
        </main>
    );
}