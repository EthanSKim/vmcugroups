import Connections from "../common/Connections";
import About from "./About";

interface RequestProps {
  id: string;
  name: string;
  members: string[];
  type: string;
  count: Number;
}


const ConnectionsTab = ({groupDetails}:{groupDetails:RequestProps}) => {
  return (
    <>
      {/* Connections  */}
      <Connections clss={"col-xxl-8"} groupDetails={groupDetails} />

      {/* <div className="col-xxl-4 col-lg-10 mt-5 mt-xl-0">
        About
        <About />
      </div> */}
    </>
  );
};

export default ConnectionsTab;
