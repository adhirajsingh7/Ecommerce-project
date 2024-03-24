import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  full_name: z.string().min(1, { message: "Full name is required" }),
  avatar: z.any(),
});

export const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.coerce.number().gte(1, { message: "Price is required" }),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type TProductSchema = z.infer<typeof productSchema>;
