import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import ContactAction from "../ui/ContactAction";

interface RequestProps {
  id: string;
  name: string;
  year: string;
  major: string;
  avatar: string;
}

const FollowCard = ({ data }: { data: RequestProps }) => {
  const { id, year, name, major, avatar } = data;

  return (
    <div className="single-box member-single p-3">
      <div className="profile-area d-center justify-content-between">
        <div className="avatar-item d-flex gap-3 align-items-center">
          {/* <div className="avatar-item">
            <Image className="avatar-img max-un" src={user_avt} alt="avatar" />
          </div> */}
          <div className="info-area text-start">
            <h6 className="m-0">
              <Link href="/public-profile/post">{name}</Link>
            </h6>
            <p className="mdtxt status">{year}</p>
            <p className="mdtxt status">{major}</p>
          </div>
        </div>
        {/* Contact Action */}
        {/* <ContactAction
          actionList={[
            ["Unfollow", "person_remove"],
            ["Hide Contact", "hide_source"],
          ]}
        /> */}
      </div>
    </div>
  );
};

export default FollowCard;
