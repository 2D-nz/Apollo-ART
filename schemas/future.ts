import { z } from "zod";

export const futureMedia = z.object({
  name: z.string(),
});
