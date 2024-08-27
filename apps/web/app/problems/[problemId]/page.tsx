
import { getProblem } from "../../db/problems";
import { ProblemStatement } from "../../components/ProblemStatement";
import Topbar from "../../components/Topbar";
import { ProblemSubmitBar } from "../../components/ProblemSubmitBar";
import { SessionProvider } from "next-auth/react";
export default async function ProblemPage({
    params: { problemId },
}: {
    params: { problemId: string },
}){
    const problem=await getProblem(problemId);
    if(!problem)
    {
        return <div>Problem not found</div>
    }
    return <div>
        <Topbar/>
        <div className="flex flex-col min-h-screen">
            <main className="flex-1  md:py-4 grid md:grid-cols-2 gap-8 md:gap-12">
            
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
          <div className="prose prose-stone dark:prose-invert">
            <ProblemStatement description={problem.description} />
          </div>
        </div>
        <ProblemSubmitBar problem={problem} />
            </main>
        </div>
    </div>
}