import { db } from "./index";

export const getProblems = async () => {
  const problems = await db.problem.findMany({
    where: {
      hidden: false,
    },
    include: {
      DefaultCode: true,
    },
  });
  return problems;
};

export const getProblem = async (problemId: string) => {
  const problem = await db.problem.findFirst({
    where: {
      id: problemId,
    },
    include: {
      DefaultCode: true,
    },
  });
  console.log("Heeeee")
  console.log(problem)
  return problem;
};