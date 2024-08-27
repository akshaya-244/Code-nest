import prismaClient from "../src/index";
import { LANGUAGE_MAPPING } from "../../common/language/index";
import { addProblemsInDB } from "./updateQuestion";
import languages_json from "../src/languages";

(async () => {
  try {
    console.log(process.env.DATABASE_URL)
    const existingLanguages = await prismaClient.language.findMany();
    console.log(existingLanguages)
    if (existingLanguages.length === 0) {
      await prismaClient.language.createMany({
        data: Object.keys(LANGUAGE_MAPPING).map((language) => ({
          id: LANGUAGE_MAPPING[language].internal,
          name: language,
          judge0Id: LANGUAGE_MAPPING[language].judge0,
        })),
      });
    } else {
      console.log("Languages already persist in the DB!");
    }
  } catch (e) {
    console.error("Error creating languages:", e);

  }
})();
(async () => {
  try {
    await prismaClient.languages.createMany({ data: languages_json })
  }
  catch (e) {
    console.log("Languages2 already persist in the DB!");
  }
}
)();
try {
  addProblemsInDB();
}
catch (e) {
  console.log("Data already persist in the DB!")
}
