import { cookies } from "next/headers";
import type { User } from "@/types/user";

const BASE_URL = process.env.BASE_URL;

export async function getCurrentUser(): Promise<User | null> {
    if (!BASE_URL) {
        throw new Error("BASE_URL no está configurada");
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        return null;
    }

    const response = await fetch(`${BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        cache: "no-store",
    });

    if (!response.ok) {
        return null;
    }

    const data: { user: User } = await response.json();

    return data.user;
}