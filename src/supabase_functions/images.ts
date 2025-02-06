import { SupabaseClient } from "@supabase/supabase-js";

export const getProfilePic = async (
  supabase: SupabaseClient,
  picture: string
) => {
  const { data, error } = await supabase.storage
    .from("profile_pics")
    .createSignedUrl(picture, 60);

  if (error) return error;
  return data;
};

export const profilePicExists = async (
  supabase: SupabaseClient,
  picture: string
) => {
  const { data, error } = await supabase.storage
    .from("profile_pics")
    .createSignedUrl(picture, 60);

  if (data) return true;
  return false;
};
