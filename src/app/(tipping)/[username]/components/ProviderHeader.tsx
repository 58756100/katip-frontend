"use client";
import Image from "next/image";

export default function ProviderHeader({ username }: { username: string }) {
  return (
    <div className="w-full max-w-lg flex flex-col items-center text-center">
      <Image
        src="/images/default-avatar.jpg"
        alt="provider avatar"
        width={80}
        height={80}
        className="rounded-full shadow"
      />

      <h1 className="mt-4 text-2xl font-semibold">
        Tip <span className="text-primary">@{username}</span>
      </h1>

      <p className="text-sm text-muted-foreground mt-1">
        Support {username} by sending them a tip ❤️
      </p>
    </div>
  );
}
