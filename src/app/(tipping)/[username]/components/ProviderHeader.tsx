// ==========================================
// 2. ProviderHeader Component
// ==========================================
"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

interface ProviderHeaderProps {
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
}

export default function ProviderHeader({ 
  username, 
  displayName, 
  avatar, 
  bio 
}: ProviderHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Avatar with verified badge */}
      <div className="relative">
        <div className="relative w-24 h-24 md:w-28 md:h-28">
          <Image
            src={avatar || "/images/default-avatar.jpg"}
            alt={`${displayName} avatar`}
            fill
            className="rounded-full object-cover border-4 border-background shadow-lg"
            priority
          />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
          <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>

      {/* Provider Info */}
      <div className="mt-6 space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">
          {displayName}
        </h1>
        
        <p className="text-lg text-muted-foreground">
          @{username}
        </p>

        {bio && (
          <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto mt-3 leading-relaxed">
            {bio}
          </p>
        )}

        <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t">
          <span className="text-2xl">❤️</span>
          <p className="text-sm text-muted-foreground">
            Show your support with a tip
          </p>
        </div>
      </div>
    </div>
  );
}