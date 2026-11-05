"use client";

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="mx-auto max-w-6xl px-6 py-10">
            <section className="rounded-lg border border-red-200 bg-red-50 p-6">
                <h1 className="text-2xl font-bold text-red-800">
                    No se pudo cargar el historial
                </h1>

                <p className="mt-2 text-red-700">
                    Ocurrió un problema al cargar tus órdenes.
                </p>

                <button
                    onClick={() => reset()}
                    className="mt-6 rounded-lg bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800"
                >
                    Intentar nuevamente
                </button>
            </section>
        </main>
    );
}