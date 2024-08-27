

import { Problems } from "./components/Problems";
import Topbar from "./components/Topbar";
export default async function Home() {

  return (
    <div className="">
      <Topbar />
      <div>
        <Problems />
      </div>


    </div>
  );
}
