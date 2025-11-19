"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/lib/validators/auth";
import { loginUser, sendOtp } from "@/utils/authActions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Props {
  email: string;
  onOtpSwitch: () => void;
}

export const PasswordLoginForm = ({ email, onOtpSwitch }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email },
  });

  const onSubmit = async (data: LoginFormValues) => {
    const result = await loginUser(data);
    if (result.success) toast.success("Logged in successfully!");
    // if (session.user.role === "provider") {
    //   redirect("/dashboard");
    // } else {
    //   redirect("/");
    // }
    else toast.error("Invalid credentials");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input disabled value={email} />
      <Input type="password" placeholder="Password" {...register("password")} />
      {errors.password && (
        <p className="text-red-500 text-xs">{errors.password.message}</p>
      )}
      <Button disabled={isSubmitting} className="w-full">
        {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : "Login"}
      </Button>
      <Button
        type="button"
        variant="ghost"
        className="w-full text-blue-600 text-sm"
        onClick={async () => {
          await sendOtp(email);
          toast.success("OTP sent!");
          onOtpSwitch();
        }}
      >
        Use OTP instead
      </Button>
    </form>
  );
};
