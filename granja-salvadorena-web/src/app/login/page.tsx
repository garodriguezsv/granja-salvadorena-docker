import LoginForm from "./LoginForm";

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-10">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Granja Salvadoreña
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Inicia sesión en tu cuenta
                    </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                    <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                        Iniciar sesión
                    </h2>

                    <LoginForm />
                </div>
            </div>
        </main>
    );
}