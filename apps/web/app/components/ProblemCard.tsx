import 
   { Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,}
   from "@repo/ui/card";
  import { PrimaryButton } from "./PrimaryButton";

  interface Problem {
    id: string;
    title: string;
    hidden: boolean;
    slug: string;
    description: string;
    solved: number;
    createdAt: string; // Use Date if you prefer to work with Date objects
  }
  
  // Define the props for the ProblemCard component
  interface ProblemCardProps {
    problem: Problem;
  }
  const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
    return (
        <Card>
        <CardHeader>
          <CardTitle>{problem.title}</CardTitle>
          <CardDescription>Easy problem for beginners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Difficulty</p>
              {/* <p>{problem.difficulty}</p> */}
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Submissions</p>
              <p>{problem.solved}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <PrimaryButton href={`/problems/${problem.id}`}>
            View Problem
          </PrimaryButton>
        </CardFooter>
      </Card>
    )
}

export default ProblemCard