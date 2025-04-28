'use client';

import FbLogin from "@/components/FbLogin";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="text-2xl mb-6">Sign Up Page</h1>
      <div className="flex flex-col gap-4 items-center">
          <FbLogin />
        </div>
      {/* You can add more providers like Google signup too */}
    </div>
  );
}
