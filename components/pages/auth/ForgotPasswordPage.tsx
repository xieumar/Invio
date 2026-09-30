"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MailCheck, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/features/auth";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ForgotPasswordForm() {
  const { sendPasswordReset } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    try {
      await sendPasswordReset(values.email);
      setSubmittedEmail(values.email);
      toast.success("Password reset instructions sent!");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to send reset email"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Title & Subtitle */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
          Forgot Your Password?
        </h1>
        <p className="text-sm text-text-secondary mt-2">
          {submittedEmail
            ? "We sent recovery instructions to your email."
            : "Enter your registered email and we'll send you a password reset link."}
        </p>
      </div>

      {submittedEmail ? (
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-paid-bg flex items-center justify-center text-paid-text shadow-sm">
            <MailCheck className="w-8 h-8" />
          </div>

          <div className="p-4 rounded-xl bg-surface-alt dark:bg-[#1e2139] border border-border/70 text-sm">
            <p className="text-text-secondary">
              If an account exists for{" "}
              <span className="font-semibold text-text-primary">
                {submittedEmail}
              </span>
              , you will receive an email shortly with reset instructions.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setSubmittedEmail(null)}
              className="w-full h-12 rounded-xl border-border/80 hover:bg-surface-alt font-semibold text-text-primary text-sm"
            >
              Try Another Email
            </Button>

            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-purple hover:text-purple-light transition-colors py-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Log In</span>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="reset-email"
              className="block text-xs font-semibold text-text-primary mb-2"
            >
              Email Address
            </label>
            <Input
              id="reset-email"
              type="email"
              placeholder="sellostore@company.com"
              autoComplete="email"
              className={`h-12 px-4 rounded-xl border-border/80 bg-surface dark:bg-surface-dark text-sm transition-all ${
                errors.email
                  ? "border-red focus-visible:ring-red/30"
                  : "focus-visible:ring-purple/40"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red mt-1.5 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-purple hover:bg-purple-light text-white font-bold text-sm rounded-xl shadow-lg shadow-purple/20 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending link...</span>
              </>
            ) : (
              <>
                <span>Send Reset Link</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>

          <p className="text-center text-xs text-text-secondary mt-8">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-bold text-purple hover:text-purple-light underline-offset-2 hover:underline"
            >
              Log In.
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}

export function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[340px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple" />
        </div>
      }
    >
      <ForgotPasswordForm />
    </Suspense>
  );
}
