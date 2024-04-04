import { z } from "zod";
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const signUpSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  full_name: z.string().min(1, { message: "Full name is required" }),
  mobile: z
    .string()
    .regex(phoneRegex, { message: "Invalid phone number" })
    .min(5, { message: "Phone must contain at least 5 characters" })
    .max(16, { message: "Phone contain at most 16 characters" }),
  role: z.string().min(1, { message: "Role is required" }),
  avatar: z.any(),
});

export const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  image: z.any(),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.coerce.number().gte(1, { message: "Price is required" }),
  stock: z.coerce.number().gte(1, { message: "Stock is required" }),
  category: z.string().min(1, { message: "Category is required" }),
});

export const reviewSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Review is required" }),
  rating: z.coerce.number().gte(1, { message: "Rating is required" }),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type TProductSchema = z.infer<typeof productSchema>;
export type TReviewSchema = z.infer<typeof reviewSchema>;
