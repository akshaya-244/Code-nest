import { z } from "zod";

export const SubmissionInput = z.object({
  code: z.string(),
  languageId: z.enum([ "cpp"]),
  problemId: z.string(),
  activeContestId: z.string().optional(),
  token: z.string(),
});
