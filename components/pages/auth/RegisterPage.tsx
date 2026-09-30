"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/features/auth";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/invoices";

  const { signUpWithEmail, signInWithGoogle, enableDemoMode } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      await signUpWithEmail(values.email, values.password, values.displayName);
      toast.success("Account created successfully!");
      router.push(redirectUrl);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create account"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Signed in with Google!");
      router.push(redirectUrl);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign in failed");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleDemoSignIn = () => {
    enableDemoMode();
    toast.info("Entered Demo Workspace");
    router.push("/invoices");
  };

  return (
    <div className="w-full">
      {/* Title & Subtitle */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
          Create An Account
        </h1>
        <p className="text-sm text-text-secondary mt-2">
          Enter your details to create your invoice workspace.
        </p>
      </div>

      {/* Main Register Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="register-name"
            className="block text-xs font-semibold text-text-primary mb-1.5"
          >
            Full Name
          </label>
          <Input
            id="register-name"
            type="text"
            placeholder="Alex Morgan"
            autoComplete="name"
            className={`h-11 px-4 rounded-xl border-border/80 bg-surface dark:bg-surface-dark text-sm transition-all ${
              errors.displayName
                ? "border-red focus-visible:ring-red/30"
                : "focus-visible:ring-purple/40"
            }`}
            {...register("displayName")}
          />
          {errors.displayName && (
            <p className="text-xs text-red mt-1 font-medium">
              {errors.displayName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="register-email"
            className="block text-xs font-semibold text-text-primary mb-1.5"
          >
            Email
          </label>
          <Input
            id="register-email"
            type="email"
            placeholder="alex@company.com"
            autoComplete="email"
            className={`h-11 px-4 rounded-xl border-border/80 bg-surface dark:bg-surface-dark text-sm transition-all ${
              errors.email
                ? "border-red focus-visible:ring-red/30"
                : "focus-visible:ring-purple/40"
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red mt-1 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="register-password"
            className="block text-xs font-semibold text-text-primary mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="register-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="new-password"
              className={`h-11 pl-4 pr-11 rounded-xl border-border/80 bg-surface dark:bg-surface-dark text-sm transition-all ${
                errors.password
                  ? "border-red focus-visible:ring-red/30"
                  : "focus-visible:ring-purple/40"
              }`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red mt-1 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="register-confirm-password"
            className="block text-xs font-semibold text-text-primary mb-1.5"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="register-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="new-password"
              className={`h-11 pl-4 pr-11 rounded-xl border-border/80 bg-surface dark:bg-surface-dark text-sm transition-all ${
                errors.confirmPassword
                  ? "border-red focus-visible:ring-red/30"
                  : "focus-visible:ring-purple/40"
              }`}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors p-1"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red mt-1 font-medium">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Primary Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || isGoogleLoading}
          className="w-full h-12 bg-purple hover:bg-purple-light text-white font-bold text-sm rounded-xl shadow-lg shadow-purple/20 transition-all flex items-center justify-center gap-2 mt-3"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            <span>Create Account</span>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-6 flex items-center justify-center">
        <div className="border-t border-border w-full" />
        <span className="bg-surface dark:bg-bg px-4 text-xs font-medium text-text-muted uppercase tracking-wider absolute">
          Or Register With
        </span>
      </div>

      {/* Social / Alternative Sign-in Buttons */}
      <div className="grid grid-cols-2 gap-3.5">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading || isLoading}
          className="h-12 rounded-xl border border-border/80 bg-surface dark:bg-surface-dark hover:bg-surface-alt font-semibold text-xs text-text-primary transition-all flex items-center justify-center gap-2.5 shadow-sm"
        >
          {isGoogleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-purple" />
          ) : (
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>Google</span>
        </button>

        <button
          type="button"
          onClick={handleDemoSignIn}
          className="h-12 rounded-xl border border-purple/30 bg-purple/5 hover:bg-purple/10 font-semibold text-xs text-purple dark:text-purple-light transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-purple" />
          <span>Demo Mode</span>
        </button>
      </div>

      {/* Login Redirection */}
      <p className="text-center text-xs text-text-secondary mt-7">
        Already Have An Account?{" "}
        <Link
          href="/login"
          className="font-bold text-purple hover:text-purple-light underline-offset-2 hover:underline"
        >
          Log In.
        </Link>
      </p>
    </div>
  );
}

export function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[420px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
