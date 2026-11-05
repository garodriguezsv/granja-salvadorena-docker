
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = process.env.BASE_URL;

export interface RegisterState {
    error?: string;
}

export async function register(
    _prevState: RegisterState,
    formData: FormData
): Promise<RegisterState> {
    if (!BASE_URL) {
        return {
            error: "BASE_URL no está configurada.",
        };
    }

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordConfirmation = formData.get("password_confirmation");

    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        typeof passwordConfirmation !== "string"
    ) {
        return {
            error: "Los datos del formulario no son válidos.",
        };
    }

    if (password !== passwordConfirmation) {
        return {
            error: "Las contraseñas no coinciden.",
        };
    }

    try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            }),
            cache: "no-store",
        });

        const data = await response.json();
        console.log("Respuesta del registro:", data);

        if (!response.ok) {
            return {
                error: data.message ?? "No se pudo crear la cuenta.",
            };
        }

        // Si el registro devuelve un token, inicia la sesión.
        redirect("/login");
    } catch (error) {
        // Next.js utiliza redirect mediante una excepción interna.
        if (
            error &&
            typeof error === "object" &&
            "digest" in error &&
            typeof error.digest === "string" &&
            error.digest.startsWith("NEXT_REDIRECT")
        ) {
            throw error;
        }

        return {
            error: "No fue posible conectar con el servidor.",
        };
    }
}
