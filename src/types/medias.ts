import { create } from "node:domain";
import { z } from "zod";

export const reviewSchema = z.object({
  name: z.string(),
  id: z.string(),
  created_at: z.date(),
  review: z.string(),
  description: z.string(),
  parent: z.optional(z.string()),
  grade: z.number(),
  grade_type: z.enum(["percentage", "star", "ten"]),
});

export type reviewType = z.infer<typeof ReviewSchema>;

export const GroupReviewSchema = z.object({
  name: z.string(),
  id: z.string(),
  created_at: z.date(),
  descrption: z.string(),
  user_id: z.string(),
});

export type reviewsGroupsType = z.infer<typeof GroupReviewSchema>;

export const createGroupReviewSchema = z.object({
  name: z.string().min(1, "You need to fill your group name"),
  descrption: z.optional(z.string()),
});

export type createGroupReviewType = z.infer<typeof createGroupReviewSchema>;
