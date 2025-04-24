"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import FbLogin from "@/components/FbLogin"; // adjust path if needed

export default function LoginButton() {
  const { data: session } = useSession();

  console.log(session , ">>>>session");
  
  useEffect(() => {
    if (session) {
      console.log("User Info:", session);
    }
  }, [session]);

  return (
    <div className="flex items-center justify-center h-screen">
      {session ? (
        <div className="text-center">
          <p className="mb-4">Welcome, {session.user?.name}</p>
          <Link href="/home">Go to Home</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <FbLogin />
        </div>
      )}
    </div>
  );
}
