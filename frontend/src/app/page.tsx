import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center w-full max-w-md">
        <div className="mb-6">
          <Image src="/logo.png" alt="Aqwaya Logo" width={80} height={80} />
        </div>
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to Aqwaya
        </h1>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link href="/auth/register">
            <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition w-full">
              Sign Up
            </button>
          </Link>
        </div>
        <div className="mt-6 text-gray-700 text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
