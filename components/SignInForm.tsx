'use client';

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import FbLogin from "@/components/FbLogin";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleEmailLogin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      alert("Login failed: " + res.error);
    } else {
      router.push("/home");
    }
  };

  const handleSignupRedirect = () => {
    router.push("/auth/signup");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[380px] md:w-[450px] h-auto bg-gray-800 rounded-lg shadow-lg flex flex-col items-center p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-100">Sign In</h2>

        {/* Email and Password Form */}
        <div className="w-full space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Login Button */}
        <button 
          onClick={handleEmailLogin}
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>

        {/* OR Divider */}
        <div className="w-full flex items-center justify-center space-x-2 my-4">
          <div className="w-full h-px bg-gray-300" />
          <span className="text-gray-500 text-sm">OR</span>
          <div className="w-full h-px bg-gray-300" />
        </div>

        {/* Facebook Login Button */}
        <FbLogin />

        {/* Redirect to Sign Up */}
        <div className="flex justify-center w-full">
          <button 
            onClick={handleSignupRedirect}
            className="text-sm text-blue-600 hover:text-blue-700 focus:outline-none"
          >
            Don’t have an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
