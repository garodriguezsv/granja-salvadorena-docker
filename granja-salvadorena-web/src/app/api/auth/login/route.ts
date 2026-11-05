import { NextResponse } from "next/server";

const BASE_URL = process.env.BASE_URL;

export async function POST(request: Request) {
    try {
        if (!BASE_URL) {
            return NextResponse.json(
                { message: "BASE_URL no está configurada" },
                { status: 500 }
            );
        }

        const body = await request.json();

        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, {
                status: response.status,
            });
        }

        const nextResponse = NextResponse.json({
            message: data.message,
            user: data.user,
        });

        nextResponse.cookies.set("auth_token", data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: data.expires_in,
            path: "/",
        });

        return nextResponse;
    } catch {
        return NextResponse.json(
            { message: "Error al procesar el inicio de sesión" },
            { status: 500 }
        );
    }
}