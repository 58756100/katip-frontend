"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export const SocialLoginButtons = () => {
  return (
    <div className="w-full font-inter mb-4 flex flex-col gap-2">
      {/* Google Login */}
      <Button
        onClick={() => signIn("google", { callbackUrl: "/social" })}
        className="w-full flex text-sm items-center justify-center gap-2 bg-transparent text-gray-800 border hover:bg-transparent shadow-none"
      >
        <FcGoogle size={24} />
        Continue with Google
      </Button>

      {/* Apple Login */}
      <Button
        onClick={() => signIn("apple", { callbackUrl: "/social" })}
        className="w-full flex text-sm items-center justify-center gap-2 bg-black text-white border border-black hover:bg-gray-900 shadow-none"
      >
        <FaApple size={24} />
        Continue with Apple
      </Button>
    </div>
  );
};
