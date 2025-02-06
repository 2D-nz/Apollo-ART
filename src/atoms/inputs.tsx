import { ReactNode } from "react";

export function InputText({ name, register }: { name: string; register: any }) {
  return (
    <input
      type="text"
      {...register(name.toLowerCase())}
      className="px-2 py-1 rounded outline-1 outline text-black outline-light-bg w-full"
    />
  );
}

export function PasswordInput({
  name,
  register,
}: {
  name: string;
  register: any;
}) {
  return (
    <input
      type="password"
      {...register(name.toLowerCase())}
      className="px-2 py-1 outline-1 outline text-black outline-light-bg w-full"
    />
  );
}
