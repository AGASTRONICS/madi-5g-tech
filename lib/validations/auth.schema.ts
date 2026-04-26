// lib/validations/auth.schema.ts
// Using zod/v3 import path for full compatibility with @hookform/resolvers v5
import { z } from "zod/v3";

// ---- Login schema ---------------------------------------------------

export const LoginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;

// ---- Register schema ------------------------------------------------

export const RegisterSchema = z
  .object({
    name: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    number: z
      .string()
      .regex(/^0[7-9][01]\d{8}$/, "Enter a valid Nigerian phone number"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type RegisterFormValues = z.infer<typeof RegisterSchema>;
