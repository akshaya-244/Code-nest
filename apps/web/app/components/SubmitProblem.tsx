"use client";
import { useEffect, useState } from "react";
import { LANGUAGE_MAPPING } from "../../../../packages/common/language";
import { Label } from "@repo/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/select";
import { Editor } from "@monaco-editor/react";
import { Turnstile } from "@marsidev/react-turnstile";
import { Button } from "@repo/ui/button";
import RenderTestcases from "./RenderTestcases";
import axios from "axios";
import { resolve } from "path";
import { toast } from "react-toastify";

export interface IProblem{
    id: string,
    title: string,
    description: string, 
    slug: string,
    DefaultCode: {
      languageId: Number, 
      code : string
    }[];
  }
  enum SubmitStatus {
    SUBMIT = "SUBMIT",
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    FAILED = "FAILED",
  }
const SubmitProblem = ({problem} : {problem: IProblem}) => {
    const [code, setCode ] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<string>(SubmitStatus.SUBMIT);
    const [language, setLanguage]=useState(Object.keys(LANGUAGE_MAPPING)[0] as string);
    const [testcases, setTestcases] = useState<any[]>([]);
    const [token, setToken] = useState<string>("");
    useEffect(() => {
       
        const defaultCode:{[key: string]: string} ={};
        console.log(problem)
        problem.DefaultCode.forEach((code) => {
          const language=Object.keys(LANGUAGE_MAPPING).find((language) => {
            console.log(language)
             return LANGUAGE_MAPPING[language]?.internal === code.languageId
          })
          if (language) {            
            defaultCode[language] = code.code;}
          
        })
        setCode(defaultCode)
        
      },[problem])

      async function pollWithBackOff(id:string, retries:number)
      {
        if(retries==0)
        {
          setStatus(SubmitStatus.SUBMIT)
          toast.error("Not able to get staus")
          return;
        }
        const response=await axios.get(`/api/submission/?id=${id}`)
        console.log("Response: ", response)


        // if(response.data.submission.status == "PENDING")
        // {
        //   setTestcases(response.data.submission.testcases)
        //   await new Promise((resolve) => setTimeout(resolve, 2.5 * 1000));
        //   pollWithBackOff(id, retries-1);

        // }
        // else{
        //   if(response.data.submission.status === "AC")
        //   {
        //     setStatus(SubmitStatus.ACCEPTED);
        //     setTestcases(response.data.submission.testcases);
        //     toast.success("Accepted!");
        //     return;

        //   }
        //   else{
        //     setStatus(SubmitStatus.FAILED);
        //     toast.error("Faliled :(");
        //     setTestcases(response.data.submission.testcases)
        //     return;
        //   }

        // }

      }

      async function Submit() {
          setStatus(SubmitStatus.PENDING);
          setTestcases((t) => t.map((tc) => ({ ...tc, status: "PENDING"})))
          try{
            const response = await axios.post(`/api/submission/`, {
              code: code[language],
              languageId: language,
              problemId: problem.id,
              token: token
            });
            console.log("Passed api/submission checkpoint" , response)
            pollWithBackOff(response.data.id, 10);
          }
          catch (e) {
            setStatus(SubmitStatus.SUBMIT);
          }

        
      }
    return<div>
        <Label>Language</Label>
        <Select value={language} defaultValue="js" onValueChange={(value) => setLanguage(value)}>
            <SelectTrigger>
                <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="z-100 bg-white">
                {Object.keys(LANGUAGE_MAPPING).map((language) => (
                    <SelectItem key={language} value={language}>
                        {LANGUAGE_MAPPING[language]?.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>

        <div className="pt-4 rounded-md ">
                <Editor  height={"60vh"} value={code[language]} theme="vs-dark" onMount={() => {}}
                    options={{
                        fontSize: 14,
                        scrollBeyondLastLine: false
                    }}
                    language={LANGUAGE_MAPPING[language]?.monaco}
                    onChange={(value) => {
                      setCode({...code, [language]:value || ""})
                    }} 
                    defaultLanguage="cpp"
                    />
           {/* {console.log(code[language])} */}
        </div>

        <div className="flex justify-end">
          {/* {process.env.NODE_ENV === "production" ? <Turnstile onSuccess={(token:string) => {
            setToken(token)
          }}
            siteKey={TUR}} */}
        <Button onClick={Submit} type="submit" className="mt-4 align-right" >Submit</Button>
        </div>
            {/* <RenderTestcases testcases={testcases} */}
    </div>
}
export default SubmitProblem;