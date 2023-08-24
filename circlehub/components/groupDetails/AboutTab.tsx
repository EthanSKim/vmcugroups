import BioContent from "../common/BioContent";
import About from "./About";

interface RequestProps {
  id: string;
  name: string;
  members: string[];
  type: string;
  count: Number;
}

const AboutTab = ({groupDetails}:{groupDetails:RequestProps}) => {
  return (
    <>
      <div className="col-xxl-8 col-xl-7">
        {/* Bio Content */}
        <BioContent />
      </div>
      {/* <div className="col-xxl-4 col-xl-5 col-lg-10 mt-5 mt-xl-0">
        About
        <About />
      </div> */}
    </>
  );
};

export default AboutTab;
