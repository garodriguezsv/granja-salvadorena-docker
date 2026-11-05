import { logout } from "@/app/login/actions";

export default function LogoutButton() {
    return (
        <form action={logout}>
            <button
                type="submit"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
            >
                Cerrar sesión
            </button>
        </form>
    );
}