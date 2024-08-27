import fs from "fs";

type SUPPORTED_LANGS = "cpp";

interface Problem {
    id: string;
    fullBoilerplatecode: string;
    inputs: string[]
    outputs: string[]

}

const MOUNT_PATH = "../problems"

export const  getProblem = async (problemId:string, language_id: SUPPORTED_LANGS) :Promise<Problem> => {
    const fullBoilerplatecode=await getProblemBoilerPlateCode(problemId,language_id)
    const inputs=await getProblemInputs(problemId)
    const outputs=await getProblemOutputs(problemId);

    return {
        id: problemId,
        fullBoilerplatecode: fullBoilerplatecode,
        inputs:inputs,
        outputs:outputs
    }
}

async function getProblemBoilerPlateCode(problemId: string, language_id: SUPPORTED_LANGS): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(`${MOUNT_PATH}/${problemId}/boilerplate-full/function.${language_id}`, {
            encoding: "utf-8"
        },
            (err, data) => {
                if (err)
                    reject(err)
                resolve(data)
            })
    })
}


async function getProblemInputs(problemId:string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(`${MOUNT_PATH}/${problemId}/tests/inputs/`,
            async (err, files) => {
                if(err)
                    console.log(err)
                else{
                    await Promise.all(
                        files.map(file => {
                            return new Promise<string>((resolve, reject) => {
                                fs.readFile(`${MOUNT_PATH}/${problemId}/tests/inputs/${file}`,{
                                    encoding: 'utf-8'
                                },
                            (err, data) => {
                                if(err)
                                    reject(err)
                                resolve(data)
                            })
                            })
                        })
                    )
                    .then( (data) =>{
                        resolve(data);
                    })
                    .catch((e) => {reject(e)})

                }
            }
        )
    })
}

async function getProblemOutputs(problemId:string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(`${MOUNT_PATH}/${problemId}/tests/outputs/`,
            async (err,files) => {
                if(err)
                    console.log(err)
                else{
                    await Promise.all(files.map((file)  => {
                        return new Promise<string>((resolve, reject) => {
                            fs.readFile(`${MOUNT_PATH}/${problemId}/tests/outputs/${file}`,{
                                encoding: 'utf-8'
                            }, 
                        (err, data) => {
                            if(err)
                                reject(err)
                            resolve(data)
                        })
                        })
                    }))
                    .then( (data) => {
                        resolve(data)
                    })
                    .catch((err) => {
                        reject(err)
                    })
                }
            }
        )
    }) 
} 