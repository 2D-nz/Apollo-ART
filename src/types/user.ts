import { z } from "zod";
export const RegisterUserSchema = z
  .object({
    name: z.string().min(1, "You need to fill your name"),
    email: z.string().email("Invalid e-mail"),
    username: z.string().min(1, "You need to have a username"),
    password: z
      .string()
      .min(6, "Your password neds to have more than 6 characters"),
    password_confirm: z.string({
      required_error: "You need to confirm your password",
    }),
  })
  .superRefine(({ password_confirm, password }, ctx) => {
    if (password_confirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Your passwords doesn't match",
        path: ["passwordConfirm"],
      });
    }
  });

export type RegisterUserType = z.infer<typeof RegisterUserSchema>;

export type User = {
  name: string;
  email: string;
  username: string;
  user_id: string;
  profile_complet: boolean;
};
