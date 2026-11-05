"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function LoginForm() {
    const [state, formAction, pending] = useActionState(
        login,
        initialState
    );

    return (
        <form action={formAction} className="space-y-6">
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
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-gray-400 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
                />
            </div>

            {state.error && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    {state.error}
                </p>
            )}

            <button
                type="submit"
                disabled={pending}
                className="w-full rounded-lg bg-gray-900 px-4 py-3 font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {pending
                    ? "Iniciando sesión..."
                    : "Iniciar sesión"}
            </button>
        </form>
    );
}