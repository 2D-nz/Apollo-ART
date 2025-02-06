import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "../../utils/supabase/server";
import { error } from "console";
import { redirect } from "next/dist/server/api-utils";
import { User } from "@/types/user";

export const getUser = async (supabase: SupabaseClient) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export const getUserWithData = async (supabase: SupabaseClient) => {
  const user = await getUser(supabase);
  const uid = user?.id;

  const { data, error } = await supabase
    .from("user")
    .select()
    .eq("user_id", uid);

  if (error) return error;
  if (data) return data[0];
};

export const getUserName = async (supabase: SupabaseClient, uid: string) => {
  const { data, error } = await supabase
    .from("user")
    .select("username")
    .eq("user_id", uid);

  if (error) return error;
  if (data) return data[0].username;
};

export const checkAuthSession = async (
  supabase: SupabaseClient,
  pageUsername: string
) => {
  let result = await getUser(supabase);
  const username = await getUserName(supabase, result?.id as string);
  return username == pageUsername;
};

export const checkUsernameAndEmailTaken = async (
  supabase: SupabaseClient,
  username: string,
  email: string
) => {
  let isTaken = { email: false, username: false };

  const checkIfUsernameIsTaken = async (
    supabase: SupabaseClient,
    username: string
  ) => {
    const { data, error } = await supabase
      .from("user")
      .select("username")
      .eq("username", username);

    if (error) return error;
    if (data.length >= 1) {
      return true;
    }
    return false;
  };

  const checkIfEmailIsTaken = async (
    supabase: SupabaseClient,
    username: string
  ) => {
    const { data, error } = await supabase
      .from("user")
      .select("email")
      .eq("email", email);

    if (error) return error;
    if (data.length >= 1) {
      return true;
    }
    return false;
  };
  const isUsernameTaken = await checkIfUsernameIsTaken(supabase, username);
  const isEmailTaken = await checkIfEmailIsTaken(supabase, email);
  return { isUsernameTaken, isEmailTaken };
};

export const addPfpAndBio = async (
  supabase: SupabaseClient,
  image: File | string,
  bio: string,
  user: User
) => {
  await updateBio(supabase, bio, user.user_id);
  await updateProfilePicture(supabase, image, user);
  await updateProfileCompleted(supabase, user.user_id);
};

export const updateBio = async (
  supabase: SupabaseClient,
  bio: string,
  uid: string
) => {
  const { error } = await supabase
    .from("user")
    .update({ bio: bio })
    .eq("user_id", uid);

  if (error) return error;
  return "Bio updated";
};

export const updateProfilePicture = async (
  supabase: SupabaseClient,
  image: File | string,
  user: User
) => {
  const avatarFile = image;
  const username = user.username;
  if (typeof image != "string") {
    const imageType = image.type.replace("image/", "");
    const path = `${username}.${imageType}`;

    await uploadPicture(supabase, path, avatarFile);
    await addPathToProfile(supabase, path, user.user_id);
  }

  if (typeof image == "string") {
    const path = image;
    await addPathToProfile(supabase, path, user.user_id);
  }

  return;
};

const addPathToProfile = async (
  supabase: SupabaseClient,
  path: string,
  uid: string
) => {
  const { error } = await supabase
    .from("user")
    .update({ picture: path })
    .eq("user_id", uid);

  if (error) {
    console.log(error);
    return error;
  }
  return;
};

const uploadPicture = async (
  supabase: SupabaseClient,
  path: string,
  avatarFile: File | string
) => {
  const { data, error } = await supabase.storage
    .from("profile_pics")
    .upload(path, avatarFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    return error;
  }
  if (data) {
    return "Profile Picture Uploaded";
  }
};

const updatePicture = async (
  supabase: SupabaseClient,
  path: string,
  avatarFile: File | string
) => {
  const { data, error } = await supabase.storage
    .from("profile_pics")
    .update(path, avatarFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.log(error);
    return;
  }
  if (data) {
    console.log("Profile Picture Uploaded");
    return;
  }
};

const updateProfileCompleted = async (
  supabase: SupabaseClient,
  uid: string
) => {
  const { error } = await supabase
    .from("user")
    .update({ profile_complete: true })
    .eq("user_id", uid);

  if (error) {
    console.log(error);
  }
  return;
};
