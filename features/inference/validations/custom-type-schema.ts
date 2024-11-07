import { z } from "zod";

export const customTypeSchema = z.object({
  customType: z
    .string()
    .min(1, "Custom type must be provided.")
    .regex(/^[a-zA-Z]/, "Custom type must start with a letter."),
});
