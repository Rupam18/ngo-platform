import { z } from "zod";

export const registerSchema = z.object({
    body: z.object({
        name: z.string().min(2, "Name must be at least 2 characters long").trim(),
        email: z.string().email("Not a valid email format").trim(),
        password: z.string().min(6, "Password must be at least 6 characters")
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email("Not a valid email").trim(),
        password: z.string().min(1, "Password is required")
    }),
});
