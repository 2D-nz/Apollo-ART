"use server";

import { profile } from "console";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";

export const signInUser = async (user: any) => {
  const supabase = await createClient();
  const email = user.get("email");
  const password = user.get("password");
  console.log(email);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (data) {
    redirect("/");
  }
  if (error) console.log(error);
};

export const createUser = async (userData) => {
  const supabase = await createClient();
  const createUserToAuth = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (error) return error;
    return data;
  };

  const authData = await createUserToAuth();
  const addUserData = async (userData, authData) => {
    const { error } = await supabase.from("user").insert({
      user_id: authData.user.id,
      name: userData.name,
      username: userData.username,
      bio: "",
      picture: "",
      profile_complete: false,
      email: userData.email,
    });

    if (error) console.log(error);
  };

  await addUserData(userData, authData);
  redirect("/login");
};
