"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ firstName, lastName, email, password });
    // TODO: integrate API route
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white">
        <CardHeader className="flex flex-col items-center">
          <Image src="/logo.png" alt="Logo" width={60} height={60} />
          <CardTitle className="mt-4 text-2xl font-bold text-gray-900">
            Create an Account
          </CardTitle>
          <p className="text-sm text-gray-500">Sign up to start using Aqwaya</p>
        </CardHeader>
        <CardContent>
          <div className="flex mb-6 border rounded-lg overflow-hidden bg-gray-100 p-1">
            <Link
              href="/auth/login"
              className="flex-1 px-4 py-2 text-gray-900 font-medium text-center"
            >
              Sign In
            </Link>

            <Link
              href="/"
              className="flex-1 px-4 py-2 bg-white text-gray-500 font-medium text-center rounded-md"
            >
              Sign Up
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* firstName */}
              <div>
                <Label htmlFor="firstName" className="text-gray-700">
                  First Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    className="pl-10"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              {/* lastName */}
              <div>
                <Label htmlFor="lastName" className="text-gray-700">
                  Last Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="LastName"
                    type="text"
                    placeholder="Doe"
                    className="pl-10"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full text-white py-3 font-semibold 
              bg-gradient-to-r from-blue-600 to-purple-600 
              hover:opacity-90 transition"
            >
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
