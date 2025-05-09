"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const FbLogin = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-center">
      {!session && (
        <div className="">
          <button
            onClick={() => signIn("google", { prompt: "consent", callbackUrl: "/home" })}
            className="flex items-center gap-3 bg-white text-black border border-gray-300 hover:shadow-lg py-2 px-8 rounded-lg font-medium transition-all duration-300 cursor-pointer mb-4"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google icon"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>

          {/* Facebook Login Button */}
          <button
            onClick={() => signIn("facebook", { callbackUrl: "/home" })}
            className="flex items-center gap-3 bg-blue-600 text-white hover:shadow-lg py-2 px-6 rounded-lg font-medium transition-all duration-300 cursor-pointer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/800px-Facebook_f_logo_%282019%29.svg.png"
              alt="Facebook icon"
              className="w-5 h-5"
            />
            Sign in with Facebook
          </button>
        </div>
      )}
    </div>
  );
};

export default FbLogin;
