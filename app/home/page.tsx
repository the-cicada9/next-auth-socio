"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import FbLogin from "@/components/FbLogin";

const HomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(session , ">>>>data");
  console.log(status , ">>>>status");
  
  
  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/");
  //   }
  // }, [status, router]);

  // if (status === "loading") {
  //   return ;
  // }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      {/* <h1 className="text-3xl mb-4">Home Page</h1> */}
      {session && (
        <div>
          <p className="text-xl mb-4">Welcome, {session.user?.name}</p>
          <p className="text-lg mb-4">Email: {session.user?.email}</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 cursor-pointer"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
