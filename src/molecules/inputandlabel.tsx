import { InputText, PasswordInput } from "@/atoms/inputs";
import { cn } from "@/lib/utils";
import { register } from "module";

export function TextInputAndLabel({
  field,
  className,
  register,
}: {
  field: string;
  className?: string;
  register: any;
}) {
  return (
    <div className={cn("w-[320px]", className)}>
      <label htmlFor={field}>{field}</label>
      <InputText register={register} name={field} />
    </div>
  );
}

export function PasswordInputAndLabel({
  name,
  className,
  register,
  isPasswordConfirm,
}: {
  name: string;
  register: any;
  isPasswordConfirm?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("w-[320px]", className)}>
      <label htmlFor={name}>
        {isPasswordConfirm ? "Confirm Passowrd" : name}
      </label>
      <PasswordInput
        register={register}
        name={isPasswordConfirm ? "password_confirm" : "Password"}
      />
    </div>
  );
}
