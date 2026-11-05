
"use client";

import { useActionState } from "react";
import { register, type RegisterState } from "./actions";

const initialState: RegisterState = {};

export default function RegisterForm() {
    const [state, formAction, pending] = useActionState(
        register,
        initialState
    );

    return (
        <form action={formAction} className="space-y-5">
            <div>
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Nombre completo
                </label>

                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full rounded-lg border border-gray-400 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
                    placeholder="Tu nombre"
                />
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Correo electrónico
                </label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-lg border border-gray-400 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
                    placeholder="correo@example.com"
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Contraseña
                </label>

                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-gray-400 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
                    placeholder="Mínimo 8 caracteres"
                />
            </div>

            <div>
                <label
                    htmlFor="password_confirmation"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Confirmar contraseña
                </label>

                <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-gray-400 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
                    placeholder="Repite tu contraseña"
                />
            </div>

            {state.error && (
                <p
                    role="alert"
                    className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    {state.error}
                </p>
            )}

            <button
                type="submit"
                disabled={pending}
                className="w-full rounded-lg bg-gray-900 px-4 py-3 font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {pending ? "Creando cuenta..." : "Crear cuenta"}
            </button>
        </form>
    );
}
