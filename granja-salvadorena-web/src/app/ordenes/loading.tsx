export default function Loading() {
    return (
        <main className="mx-auto max-w-6xl px-6 py-10">
            <div className="animate-pulse">
                <div className="mb-3 h-10 w-64 rounded bg-gray-200" />
                <div className="mb-8 h-5 w-80 rounded bg-gray-200" />

                <div className="space-y-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-48 rounded-lg bg-gray-200"
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}