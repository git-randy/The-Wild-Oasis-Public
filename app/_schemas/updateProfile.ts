import { z } from "zod";

export const updateProfileSchema = z.object({
  full_name: z.string(),
  email: z.email(),
  national_id: z
    .string()
    .trim()
    .min(6, "National ID has 6-12 digits")
    .max(12, "National ID has 6-12 digits"),
});

export interface SignUpActionState {
  form?: {
    nationality: string;
    national_id: number;
  };
  errors?: {
    nationality: string[];
    national_id: number[];
  };
}