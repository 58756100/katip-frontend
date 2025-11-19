"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";


export const SocialLoginButtons = () => {
  return (
    <div className="w-full font-inter  mb-4">
      <Button
        onClick={() => signIn("google", { callbackUrl: "/social" })}
        // Removed 'bg-white' and added 'bg-transparent' for no background
        // Added 'hover:bg-transparent' to prevent background on hover
        // Added '' to remove any default shadow
        className="w-full flex text-sm items-center  justify-center gap-2 bg-transparent text-gray-800 border hover:bg-transparent shadow-none "
      >
        <FcGoogle size={24} />
        Continue with Google
      </Button>


    </div>
  );
};