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

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
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

export const addressSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State is required" }),
  city: z.string().min(1, { message: "City is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  zip_code: z.coerce.number().gte(1, { message: "Zip code is required" }),
});

export const CountrySchema = z.object({
  country: z.any(),
  state: z.any(),
  city: z.any(),
});
export type TCountrySchema = z.infer<typeof CountrySchema>;

export const passwordChangeSchema = z
  .object({
    password: z.string().min(1, "Password is required"),
    new_password: z.string().min(1, "New Password is required"),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  });

export const personalInfoSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  full_name: z.string().min(1, { message: "Full name is required" }),
  mobile: z
    .string()
    .regex(phoneRegex, { message: "Invalid phone number" })
    .min(5, { message: "Phone must contain at least 5 characters" })
    .max(16, { message: "Phone contain at most 16 characters" }),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type TLoginSchema = z.infer<typeof loginSchema>;
export type TProductSchema = z.infer<typeof productSchema>;
export type TReviewSchema = z.infer<typeof reviewSchema>;
export type TAddressSchema = z.infer<typeof addressSchema>;
export type TPasswordChangeSchema = z.infer<typeof passwordChangeSchema>;
export type TpersonalInfoSchema = z.infer<typeof personalInfoSchema>;
