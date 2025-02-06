import { SupabaseClient } from "@supabase/supabase-js";

export const getReviews = async (supabase: SupabaseClient, uid: string) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("name")
    .eq("user_id", uid);

  if (error) return error;
  if (data) return data;
};
