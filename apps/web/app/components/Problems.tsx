import { getProblems } from "../db/problems";
import ProblemCard from "./ProblemCard";
export async function Problems()
{
    const problems=await getProblems();    
    console.log("Problem Statement: ",problems)
    return (<div>
       <div>
          <h2 className="text-2xl font-bold mb-2">Popular Problems</h2>
          
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((prob) => (
            <ProblemCard problem={prob} key={prob.id} />
          ))}
          </div>
          </div>
        
    )
}