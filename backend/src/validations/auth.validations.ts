import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    fullName: z.string().min(3),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"),
    phoneNumber: z.string(),
    password: z.string().min(6),
    role: z.enum(["user", "admin", "vendor"]).optional().default("user"),
  })
});

export const loginSchema = z.object({
    body: z.object({

        email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"),
        password: z.string().min(6)
    })
})