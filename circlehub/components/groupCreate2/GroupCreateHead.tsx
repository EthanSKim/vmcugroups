import Image from "next/image";
import Link from "next/link";
import ContactAction from "../ui/ContactAction";
import avatar_2 from "/public/images/avatar-2.png";
import create_cover from "/public/images/create-group-cover-img.png";
import group_avatar from "/public/images/group-avatar-10.png";

const GroupCreateHead = () => {
  return (
    <>
      <div className="avatar-area">
        <Image className="avatar-img w-100" src={create_cover} alt="image" />
      </div>
      <div className="top-area py-4 d-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex gap-3 align-items-center">
          <div className="abs-avatar-item m-0">
            <Image
              className="avatar-img max-un"
              src={group_avatar}
              alt="avatar"
            />
          </div>
          <div className="text-area text-start">
            <h6 className="m-0 mb-1">Java World Group</h6>
            <p className="mdtxt">Public Group-30k Member</p>
          </div>
        </div>
        <div className="btn-item d-center gap-3">
          <Link href="#" className="cmn-btn third gap-1">
            <i className="material-symbols-outlined mat-icon fs-xl">add_box</i>
            Invite
          </Link>
          {/* Contact Action */}
          {/* <ContactAction
            actionList={[
              ["Unfollow", "person_remove"],
              ["Hide", "hide_source"],
            ]}
          /> */}
        </div>
      </div>
      <div className="friends-list d-flex flex-wrap gap-2 align-items-center text-center">
        <ul className="d-flex align-items-center justify-content-center">
          {[
            avatar_2,
            avatar_2,
            avatar_2,
            avatar_2,
            avatar_2,
            avatar_2,
            avatar_2,
            avatar_2,
            avatar_2,
          ].map((itm, i) => (
            <li key={i}>
              <Image src={itm} alt="image" />
            </li>
          ))}
        </ul>
        <span className="mdtxt d-center">
          Rezeka, Martiola, Larmjio, and 10+ more
        </span>
      </div>
    </>
  );
};

export default GroupCreateHead;
