import { NextRequest, NextResponse } from "next/server";
import { SubmissionInput } from "../../../../../packages/common/zod/submissionInputs"
import { db } from '../../db'
import { getProblem } from "../../lib/problem";
import axios from "axios";
import { LANGUAGE_MAPPING } from "../../../../../packages/common/language";
import { pathToFileURL } from "url";
import { Session } from "inspector";
export async function POST(req: NextRequest) {
    const submissionInput = SubmissionInput.safeParse(await req.json());
    console.log("Submission Input: ",submissionInput)

    if (!submissionInput.success) {
        return NextResponse.json({
            message: "Invalid Input"
        },
            {
                status: 400
            }
        );
    }
    
    const dbProblem = await db.problem.findUnique({
        where:
        {
            id: submissionInput.data.problemId
        }
    })
    if (!dbProblem) {
        return NextResponse.json({
            message: "Problem not found"
        }, {
            status: 401
        })
    }

    const problem = await getProblem(
        dbProblem.slug,
        submissionInput.data.languageId
    );
    console.log("Submission Input Code: ",submissionInput.data.code)
    problem.fullBoilerplatecode = problem.fullBoilerplatecode.replace("##USER_CODE_HERE##", submissionInput.data.code)

    console.log("Language Id", LANGUAGE_MAPPING[submissionInput.data.languageId]?.judge0)


    console.log("Response: 7")
    
    const data = problem.inputs.map((input, index) => ({
        language_id: LANGUAGE_MAPPING[submissionInput.data.languageId]?.judge0,
        source_code: problem.fullBoilerplatecode.replace("##INPUT_FILE_INDEX##", index.toString()),
        stdin: problem.inputs[index],
        expected_output: problem.outputs[index],
        callback_url: "https://localhost:3000/api/submission_callback"
    }))
    const logData={
        submissions:data
    }

    console.log("Sending Data")
    console.log(logData)

    const response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions/batch',
        logData,
        {
            headers:
            {
                'x-rapidapi-key': '5abab1aed3msh2e424caeebc7ffap176ef6jsn15cc7109a20d',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                'Content-Type': 'application/json'
            }
        }
    )
    console.log("Responses: ", response.data)
    // const responseTestcasesdata = problem.inputs.map((input, index) => ({
    //     token: response.data[index].token,
    //     language_id: LANGUAGE_MAPPING[submissionInput.data.languageId]?.judge0,
    //     source_code: problem.fullBoilerplatecode.replace("##INPUT_FILE_INDEX##", index.toString()),
    //     stdin: problem.inputs[index],
    //     expected_output: problem.outputs[index]

    // }))

  

    // const testcases=await db.testCases.createMany({
    //     data: responseTestcasesdata
    // })
    // console.log("Testcases created")
    try{
        const responseSubmissionsdata = problem.inputs.map((input, index) => ({
            token: response.data[index].token,
            problemId: submissionInput.data.problemId,
            userId:"1",
            // language_id: LANGUAGE_MAPPING[submissionInput.data.languageId]?.judge0,
            code: problem.fullBoilerplatecode.replace("##INPUT_FILE_INDEX##", index.toString()),
            status: "PENDING"
    
        }))
    
        const submission=await db.submissions.createMany({
            data: responseSubmissionsdata
        })
        console.log("Submission: ", submission)
    }
    catch(e){
        console.log(e)
    }
    

    return NextResponse.json({
        message: "Submission made",
        // id: submission.token,

    },
        {
            status: 200
        }
    );

   
}

export async function GET(req: NextRequest) {

    // const options = {
    //     method: 'GET',
    //     url: 'https://judge0-ce.p.rapidapi.com/submissions/2e979232-92fd-4012-97cf-3e9177257d10',
    //     params: {
    //         base64_encoded: 'true',
    //         fields: '*'
    //     },
    //     headers: {
    //         'x-rapidapi-key': '5abab1aed3msh2e424caeebc7ffap176ef6jsn15cc7109a20d',
    //         'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
    //     }
    // };

    // try {
    //     const response = await axios.request(options);
    //     console.log(response.data);
    // } catch (error) {
    //     console.error(error);
    // }
    return NextResponse.json({
        message: "Got Submission",
    },
        {
            status: 200
        })
}