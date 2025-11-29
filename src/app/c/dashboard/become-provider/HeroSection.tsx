"use client";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="text-center space-y-4">
      <h1 className="text-3xl font-bold text-primary">
        Join our network and start receiving tips instantly
      </h1>
      <p className="text-muted-foreground">
        Sign up, create your profile, share your QR link, and let your
        customers tip you directly via mobile money or card.
      </p>
      <Button
        onClick={() =>
          document
            .getElementById("provider-form")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        Get Started
      </Button>
    </section>
  );
}
