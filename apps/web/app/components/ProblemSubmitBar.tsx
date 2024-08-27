"use client";

import { Tabs, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { useEffect, useState } from "react";
import {LANGUAGE_MAPPING} from "../../../../packages/common/language/index"
import SubmitProblem from "./SubmitProblem";

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

export const ProblemSubmitBar = ({
  problem
}:{
  problem: IProblem
}) => {
  const [activeTab, setActiveTab] = useState("problem");


  return   <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
  <div className="grid gap-4">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Tabs
          defaultValue="problem"
          className="rounded-md p-1"
          value={activeTab}
          onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="problem">Submit</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
    <div className={`${activeTab === "problem" ? "" : "hidden"}`}>
      <SubmitProblem problem={problem}  />
    </div>
    {/* {activeTab === "submissions" && <Submissions problem={problem} />} */}
  </div>
</div>
}



