"use client";

import { homeLeftMenu } from "@/data/sidbarData";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Shortcuts from "../common/Shortcuts";
import avatar_1 from "/public/images/avatar-1.png";
import avatar_2 from "/public/images/avatar-2.png";
import avatar_3 from "/public/images/avatar-3.png";
import avatar_4 from "/public/images/avatar-4.png";
import avatar_5 from "/public/images/avatar-5.png";
import avatar_6 from "/public/images/avatar-6.png";
import avatar_7 from "/public/images/avatar-7.png";
import avatar_8 from "/public/images/avatar-8.png";
import avatar_9 from "/public/images/avatar-9.png";
import avatar_10 from "/public/images/avatar-10.png";

interface RequestProps {
  id: string;
  name: string;
  year: string;
  major: string;
  avatar: string;
}

const HomeLeft = ({ clss, curUser }: { clss?: string, curUser:RequestProps }) => {
  const [activeProfile, setActiveProfile] = useState<boolean>(false);
  const pathname = usePathname();

  const avatars = [avatar_1, avatar_2, avatar_3, avatar_4, avatar_5, avatar_6, avatar_7, avatar_8, avatar_9, avatar_10];

  const userAvatar = avatars[Number(curUser.avatar)-1];

  return (
    <>
      <div className={`d-inline-block ${clss}`}>
        <button
          className="button profile-active mb-4 mb-lg-0 d-flex align-items-center gap-2"
          onClick={() => setActiveProfile(!activeProfile)}
        >
          <i className="material-symbols-outlined mat-icon"> tune </i>
          <span>My profile</span>
        </button>
      </div>
      {
        activeProfile?
        <div
          className={`profile-sidebar cus-scrollbar p-5 ${
            activeProfile && "active"
          }`}
        >
          <div className="d-block d-lg-none position-absolute end-0 top-0">
            <button
              className="button profile-close mt-3 me-2"
              onClick={() => setActiveProfile(false)}
            >
              <i className="material-symbols-outlined mat-icon fs-xl"> close </i>
            </button>
          </div>
          <div className="profile-pic d-flex gap-2 align-items-center">
            <div className="avatar position-relative">
              <Image className="avatar-img max-un" src={userAvatar} alt="avatar" />
            </div>
            <div className="text-area">
              <h6 className="m-0 mb-1">
                {curUser.name}
              </h6>
              <p className="mdtxt">#{curUser.year}</p>
              <p className="mdtxt">#{curUser.major}</p>
            </div>
          </div>
          <ul className="profile-link mt-7 mb-7 pb-7">
            {/* home Left Menu */}
            {homeLeftMenu.map(([icon, item, url], i) => (
              <li key={i}>
                <Link
                  href={url}
                  className={`d-flex gap-4 ${pathname === url ? "active" : ""}`}
                >
                  <i className="material-symbols-outlined mat-icon"> {icon} </i>
                  <span>{item}</span>
                </Link>
              </li>
            ))}
          </ul>
          {/* <div className="your-shortcuts">
            <h6 className="mb-7">Your shortcuts</h6>

            Shortcuts 
            <Shortcuts />
          </div> */}
        </div>
        :
        <></>
      }
    </>
  );
};

export default HomeLeft;
