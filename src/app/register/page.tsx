"use client";
import { PrimaryButton, SecondaryButton } from "@/atoms/buttons";
import {
  PasswordInputAndLabel,
  TextInputAndLabel,
} from "@/molecules/inputandlabel";
import { checkUsernameAndEmailTaken } from "@/supabase_functions/user";
import { RegisterUserSchema, RegisterUserType } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { createClient } from "../../../utils/supabase/client";
import { createUser } from "@/supabase_functions/auth_actions";

export default function Page() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    getValues,
    setError,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    resolver: zodResolver(RegisterUserSchema),
  });

  const supabase = createClient();
  const onSubmit = async (FormData: RegisterUserType) => {
    console.log(FormData);

    const { isUsernameTaken, isEmailTaken } = await checkUsernameAndEmailTaken(
      supabase,
      getValues("username"),
      getValues("email")
    );

    if (isUsernameTaken) {
      setError("username", { message: "This username is already taken" });
    }

    if (isEmailTaken) {
      setError("email", { message: "This email is already being used" });
    }

    if (isUsernameTaken || isEmailTaken) {
      return;
    }
    await createUser(FormData);
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
          <h1 className="text-2xl">Register</h1>
          <TextInputAndLabel register={register} field="Email" />
          {errors.email && (
            <p className="w-full pl-5 text-red-500">
              {" "}
              {errors.email.message?.toString()}{" "}
            </p>
          )}

          <TextInputAndLabel register={register} field="Name" />
          {errors.name && (
            <p className="w-full pl-5 text-red-500">
              {" "}
              {errors.name.message?.toString()}{" "}
            </p>
          )}
          <TextInputAndLabel register={register} field="Username" />
          {errors.username && (
            <p className="w-full pl-5 text-red-500">
              {" "}
              {errors.username.message?.toString()}{" "}
            </p>
          )}

          <PasswordInputAndLabel register={register} name="Password" />

          {errors.password && (
            <p className="w-full pl-5 text-red-500">
              {" "}
              {errors.password.message?.toString()}{" "}
            </p>
          )}
          <PasswordInputAndLabel
            register={register}
            name="password_confirm"
            isPasswordConfirm={true}
          />

          {errors.passwordConfirm && (
            <p className="w-full pl-5 text-red-500">
              {" "}
              {errors.passwordConfirm.message?.toString()}{" "}
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
