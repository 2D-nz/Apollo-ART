import { SupabaseClient } from "@supabase/supabase-js";

export const getAllReviewsNames = async (
  supabase: SupabaseClient,
  uid: string
) => {
  let query = supabase
    .from("reviews")
    .select("name, id, created_at, user_id")
    .eq("user_id", uid)
    .is("parent", null)
    .order("created_at", { ascending: true });

  const { data, error } = await query;

  if (error) return error;
  if (data) return data;
};

export const getAllReviewsAndGroups = async (
  supabase: SupabaseClient,
  uid: string
) => {
  const groups = await getGroups(supabase, uid);
  const reviews = await getAllReviewsNames(supabase, uid);
  return OrderGroupsAndReviews(groups, reviews);
};

export const OrderGroupsAndReviews = (groups, reviews) => {
  groups.forEach((item) => {
    item.group = true;
  });
  let orderedBoth = groups.concat(reviews);
  orderedBoth.sort((a, b) => a.created_at - b.created_at);

  return orderedBoth;
};

export const getGroups = async (supabase: SupabaseClient, uid: string) => {
  const { data, error } = await supabase
    .from("reviews_groups")
    .select("name, id, created_at")
    .eq("user_id", uid);

  if (error) return error;
  if (data) return data;
};
export const getDataFromGroup = async (
  supabase: SupabaseClient,
  id: string
) => {
  const { data, error } = await supabase
    .from("reviews")
    .select()
    .eq("parent", id)
    .order("created_at", { ascending: true });

  if (error) return error;
  if (data) return data;
};

export const getGroup = async (supabase: SupabaseClient, id: string) => {
  const { data, error } = await supabase
    .from("reviews_groups")
    .select()
    .eq("id", id);
  if (error) return error;
  if (data) return data[0];
};

export const getReview = async (supabase: SupabaseClient, id: string) => {
  const { data, error } = await supabase.from("reviews").select().eq("id", id);

  if (error) return error;
  if (data) return data[0];
};
