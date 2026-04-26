"use client";

// app/(auth)/register/page.tsx
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  User,
  Phone,
  Zap,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "@/lib/hooks/useAuth";
import {
  RegisterSchema,
  type RegisterFormValues,
} from "@/lib/validations/auth.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { ApiError } from "@/types/api.types";

const fieldClass =
  "h-11 rounded-xl border-border/60 bg-muted/30 focus-visible:bg-background transition-colors";

export default function RegisterPage() {
  const { registerMutation } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      number: "",
      password: "",
      confirm_password: "",
    },
  });

  function onSubmit(data: RegisterFormValues) {
    registerMutation.mutate(data);
  }

  const apiErrorMessage = registerMutation.isError
    ? (registerMutation.error as ApiError).message
    : null;

  return (
    <div className="w-full max-w-[440px] space-y-7">
      {/* Mobile brand — hidden on lg */}
      <div className="flex lg:hidden items-center gap-2.5 justify-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight">Madi 5G Tech</span>
      </div>

      {/* Heading */}
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Create account
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Join 10,000+ Nigerians on Madi 5G Tech — it&apos;s free
        </p>
      </div>

      {/* API error */}
      {apiErrorMessage && (
        <Alert variant="destructive" className="py-3 rounded-xl">
          <AlertDescription>{apiErrorMessage}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Row 1: Name + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full name */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium">
              Full name
            </Label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Abdulsamad Opeyemi"
                className={`pl-10 ${fieldClass}`}
                aria-invalid={!!errors.name}
                disabled={registerMutation.isPending}
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-destructive" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label htmlFor="number" className="text-sm font-medium">
              Phone number
            </Label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="number"
                type="tel"
                autoComplete="tel"
                placeholder="08012345678"
                inputMode="numeric"
                className={`pl-10 ${fieldClass}`}
                aria-invalid={!!errors.number}
                disabled={registerMutation.isPending}
                {...register("number")}
              />
            </div>
            {errors.number && (
              <p className="text-xs text-destructive" role="alert">
                {errors.number.message}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium">
            Email address
          </Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@gmail.com"
              className={`pl-10 ${fieldClass}`}
              aria-invalid={!!errors.email}
              disabled={registerMutation.isPending}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Row 2: Password + Confirm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Password */}
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Min. 8 chars"
                className={`pl-10 pr-10 ${fieldClass}`}
                aria-invalid={!!errors.password}
                disabled={registerMutation.isPending}
                {...register("password")}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((p) => !p)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm password */}
          <div className="space-y-1.5">
            <Label htmlFor="confirm_password" className="text-sm font-medium">
              Confirm password
            </Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirm_password"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Repeat password"
                className={`pl-10 pr-10 ${fieldClass}`}
                aria-invalid={!!errors.confirm_password}
                disabled={registerMutation.isPending}
                {...register("confirm_password")}
              />
              <button
                type="button"
                aria-label={showConfirm ? "Hide password" : "Show password"}
                onClick={() => setShowConfirm((p) => !p)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none"
                tabIndex={-1}
              >
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirm_password && (
              <p className="text-xs text-destructive" role="alert">
                {errors.confirm_password.message}
              </p>
            )}
          </div>
        </div>

        {/* Terms note */}
        <p className="text-xs text-muted-foreground leading-relaxed">
          By creating an account you agree to our{" "}
          <Link
            href="/terms"
            className="text-primary underline-offset-4 hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-primary underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all gap-2"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account…
            </>
          ) : (
            <>
              Create account
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[11px] text-muted-foreground tracking-wide uppercase">
          secured &amp; encrypted
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary underline-offset-4 hover:underline transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
