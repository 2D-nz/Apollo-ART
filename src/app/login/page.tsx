"use client";
import { PrimaryButton, SecondaryButton } from "@/atoms/buttons";
import { InputText } from "@/atoms/inputs";
import {
  PasswordInputAndLabel,
  TextInputAndLabel,
} from "@/molecules/inputandlabel";
import { createUser, signInUser } from "../../supabase_functions/auth_actions";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { createClient } from "../../../utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { getUserName } from "@/supabase_functions/user";
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha precisa estar prenchida"),
});

export default function Page() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const supabase = createClient();
  const onSubmit = async (FormData) => {
    console.log(FormData);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: FormData.email,
      password: FormData.password,
    });
    if (error) {
      console.log(error);
      return;
    } else {
      toast.success("Login com sucesso");
      const username = await getUserName(supabase, data.user.id);

      router.push(`/${username}`);
    }
  };

  return (
    <main className="grid h-screen place-items-center bg-dark-bg text-light-text">
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="space-y-5 outline-light-bg rounded-md outline-1  outline w-[350px] justify-center  transition-height 
      ease-in-out"
      >
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center py-5 space-y-5"
        >
          <h1 className="text-2xl">Login</h1>
          <TextInputAndLabel register={register} field="Email" />
          {errors.email && (
            <p className="w-full pl-5 text-red-500">
              {" "}
              {errors.email.message?.toString()}{" "}
            </p>
          )}
          <PasswordInputAndLabel register={register} name="Password" />

          {errors.password && (
            <p className="w-full pl-5 text-red-500">
              {" "}
              {errors.password.message?.toString()}{" "}
            </p>
          )}
          <div className="w-full px-5 space-y-6">
            <PrimaryButton className="w-full">Confirm</PrimaryButton>
            <Link href="/register">
              <SecondaryButton className="w-full">Register</SecondaryButton>
            </Link>
          </div>
        </motion.form>
      </motion.div>
      <Toaster />
    </main>
  );
}
