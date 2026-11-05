"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = process.env.BASE_URL;

export interface LoginState {
    error?: string;
}

export async function login(
    _prevState: LoginState,
    formData: FormData
): Promise<LoginState> {
    if (!BASE_URL) {
        return {
            error: "BASE_URL no está configurada.",
        };
    }

    const email = formData.get("email");
    const password = formData.get("password");

    if (
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        return {
            error: "Datos de inicio de sesión inválidos.",
        };
    }

    let data;

    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        data = await response.json();

        if (!response.ok) {
            return {
                error: data.message ?? "Credenciales incorrectas.",
            };
        }
    } catch {
        return {
            error: "No fue posible conectar con el servidor.",
        };
    }

    const cookieStore = await cookies();

    cookieStore.set("auth_token", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: data.expires_in,
        path: "/",
    });

    redirect("/");
}

export async function logout() {
    const cookieStore = await cookies();

    cookieStore.delete("auth_token");

    redirect("/login");
}