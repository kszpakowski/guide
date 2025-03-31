"use client";
import { useAuth } from "../lib/useAuth";
import Link from "next/link"

export default function Navbar() {
    const { user, loading } = useAuth();

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-gray-300 hover:text-white">
                        <h1 className="text-xl font-bold">Guide</h1>
                    </Link>




                    {loading ? (
                        <span className="text-gray-300">Loading...</span>
                    ) : user ? (
                        <>
                            <span className="text-gray-300">{user.email}</span>
                            <Link href="/logout" className="text-gray-300 hover:text-white">
                                Logout
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-300 hover:text-white">
                                Login
                            </Link>
                            <Link href="/register" className="text-gray-300 hover:text-white">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}