import Link from "next/link";

interface ConfirmationPageProps {
    searchParams: Promise<{
        redirect_status?: string;
        payment_intent?: string;
    }>;
}

export default async function ConfirmationPage({
    searchParams,
}: ConfirmationPageProps) {
    const params = await searchParams;

    const paymentSucceeded =
        params.redirect_status === "succeeded";

    return (
        <main className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="mx-auto max-w-2xl">
                {paymentSucceeded ? (
                    <section className="rounded-lg border border-gray-200 bg-white p-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900">
                            ¡Pago realizado correctamente!
                        </h1>

                        <p className="mt-4 text-gray-700">
                            Tu pago fue procesado correctamente.
                        </p>

                        {params.payment_intent && (
                            <p className="mt-4 text-sm text-gray-600">
                                ID del pago:{" "}
                                <span className="font-medium">
                                    {params.payment_intent}
                                </span>
                            </p>
                        )}

                        <Link
                            href="/"
                            className="mt-8 inline-block rounded-lg bg-gray-900 px-5 py-3 font-medium text-white hover:bg-gray-700"
                        >
                            Volver al catálogo
                        </Link>
                    </section>
                ) : (
                    <section className="rounded-lg border border-gray-200 bg-white p-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900">
                            El pago no se completó
                        </h1>

                        <p className="mt-4 text-gray-700">
                            No fue posible confirmar el pago.
                        </p>

                        <Link
                            href="/"
                            className="mt-8 inline-block rounded-lg bg-gray-900 px-5 py-3 font-medium text-white hover:bg-gray-700"
                        >
                            Volver al catálogo
                        </Link>
                    </section>
                )}
            </div>
        </main>
    );
}