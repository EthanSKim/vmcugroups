import VerticalRequestCard from "../cards/VerticalRequestCard";
import FriendLeftMenu from "../menu/FriendLeftMenu";
import suggestion_img_1 from "/public/images/suggestion-img-1.png";
import suggestion_img_10 from "/public/images/suggestion-img-10.png";
import suggestion_img_11 from "/public/images/suggestion-img-11.png";
import suggestion_img_12 from "/public/images/suggestion-img-12.png";
import suggestion_img_2 from "/public/images/suggestion-img-2.png";
import suggestion_img_3 from "/public/images/suggestion-img-3.png";
import suggestion_img_4 from "/public/images/suggestion-img-4.png";
import suggestion_img_5 from "/public/images/suggestion-img-5.png";
import suggestion_img_6 from "/public/images/suggestion-img-6.png";
import suggestion_img_7 from "/public/images/suggestion-img-7.png";
import suggestion_img_8 from "/public/images/suggestion-img-8.png";
import suggestion_img_9 from "/public/images/suggestion-img-9.png";

const leaders = [
  {
    id: "1",
    name: "Susie Choi",
    year: "President",
    major: "Home protector",
    avatar: "1"
  },
  {
    id: "1",
    name: "Han Jung",
    year: "Tresurer",
    major: "Statistic",
    avatar: "1"
  },
  {
    id: "1",
    name: "Soohwan Kim",
    year: "MC & drive master",
    major: "Computer Science",
    avatar: "1"
  },
  {
    id: "1",
    name: "Jaden Choi",
    year: "MC & SNS",
    major: "Visualization",
    avatar: "1"
  },
  {
    id: "1",
    name: "Chan Moon",
    year: "Secretary & drive master",
    major: "Mechanical Engineering",
    avatar: "1"
  },
  {
    id: "1",
    name: "Hannah Lee",
    year: "SNS & idk",
    major: "idk",
    avatar: "1"
  },
];

interface RequestProps {
  id: string;
  name: string;
  year: string;
  major: string;
  avatar: string;
}

const SuggestionsMain = ({curUser}:{curUser:RequestProps}) => {
  return (
    <main className="main-content">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            {/* Friend Left Menu */}
            <FriendLeftMenu curUser={curUser}/>
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="row cus-mar friend-request">
              {leaders.map((user) => (
                <div key={user.id} className="col-xl-4 col-sm-6 col-8">
                  {/* Friend Suggestion Card */}
                  <VerticalRequestCard data={user} reqType="Request" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SuggestionsMain;
