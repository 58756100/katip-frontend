"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, EmailFormValues } from "@/lib/validators/auth";
import { checkEmailExists } from "@/utils/authActions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Props {
  onVerified: (email: string) => void;
  onSignupRedirect: (email: string) => void;
  onOtpSwitch: (email: string) => void;
}

export const EmailCheckForm = ({ onVerified, onSignupRedirect }: Props) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema)
  });

  const onSubmit = async (data: EmailFormValues) => {
    const { email } = data;
    try {
      const result = await checkEmailExists(email);
      if (result.exists) {
        toast.success("Email found. Continue to login.");
        onVerified(email);
      } else {
        toast.info("Email not found, redirecting to signup.");
        onSignupRedirect(email);
      }
    } catch {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input placeholder="Email" {...register("email")} />
      {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : "Continue"}
      </Button>
    </form>
  );
};
