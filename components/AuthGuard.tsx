"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const publicRoutes = ["/", "/about", "/auth/signin", "/auth/signup"]; // pages that don't need auth

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated" && !publicRoutes.includes(pathname)) {
      router.push("/"); // Redirect to home if not authenticated and trying to access protected routes
    }

    if (status === "authenticated" && (pathname === "/auth/signin" || pathname === "/auth/signup")) {
      router.push("/home"); // Redirect to home if logged in and trying to access signin/signup
    }
  }, [status, pathname, router]);

  if (status === "loading") {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return <>{children}</>;
}
