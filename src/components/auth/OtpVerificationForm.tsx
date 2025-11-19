"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, OtpFormValues } from "@/lib/validators/auth";
import { verifyOtp } from "@/utils/authActions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Props {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}

export const OtpVerificationForm = ({ email, onSuccess, onBack }: Props) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { email }
  });

  const onSubmit = async (data: OtpFormValues) => {
    const verified = await verifyOtp(data.email, data.otpCode);
    if (verified) {
      toast.success("OTP verified!");
      onSuccess();
    } else toast.error("Invalid OTP code");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input disabled value={email} />
      <Input placeholder="Enter OTP" {...register("otpCode")} />
      {errors.otpCode && <p className="text-red-500 text-xs">{errors.otpCode.message}</p>}
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onBack} className="w-1/2">Back</Button>
        <Button type="submit" disabled={isSubmitting} className="w-1/2">
          {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : "Verify"}
        </Button>
      </div>
    </form>
  );
};
