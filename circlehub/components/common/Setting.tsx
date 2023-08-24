"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
const userKey = "@userData"

const Setting = ({ activeHandler }: { activeHandler: (a: string) => void }) => {
  const [enabled, setEnabled] = useState(false);
  const { theme, setTheme } = useTheme();
  const initialState = {id:"", name:"", year:"", major:"", avatar:""};
  const [curUser, setCurUser] = useState(initialState);

  const avatars = [avatar_1, avatar_2, avatar_3, avatar_4, avatar_5, avatar_6, avatar_7, avatar_8, avatar_9, avatar_10];

  const handleTheme = () => {
    setTheme(theme === "dark" || theme === "system" ? "light" : "dark");
  };

  useEffect(() => {
    setEnabled(true);
    const userInfo = localStorage.getItem(userKey);

    if(userInfo != null) {
      setCurUser(JSON.parse(userInfo));
    }
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div className="profile-pic d-flex align-items-center">
        <span
          className="avatar cmn-head active-status"
          onClick={() => activeHandler("settings")}
        >
          <Image className="avatar-img max-un" src={avatars[Number(curUser.avatar)-1]} alt="avatar" />
        </span>
      </div>
      <div className="main-area p-5 profile-content">
        <div className="head-area">
          <div className="d-flex gap-3 align-items-center">
            {/* <div className="avatar-item">
              <Image
                className="avatar-img max-un"
                src={avatar_1}
                alt="avatar"
              />
            </div> */}
            <div className="text-area">
              <h6 className="m-0 mb-1">{curUser.name}</h6>
              <p className="mdtxt">Church Member</p>
            </div>
          </div>
        </div>
        {/* <div className="view-profile my-2">
          <Link href="/profile/post" className="mdtxt w-100 text-center py-2">
            View profile
          </Link>
        </div> */}
        <ul>
          <li>
            <Link href="/setting" className="mdtxt">
              <i className="material-symbols-outlined mat-icon"> settings </i>
              Settings
            </Link>
          </li>
          {/* <li>
            <Link href="/#" className="mdtxt">
              <i className="material-symbols-outlined mat-icon">
                power_settings_new
              </i>
              Sign Out
            </Link>
          </li> */}
        </ul>
        <div className="switch-wrapper mt-4 d-flex gap-1 align-items-center">
          <i
            className={`mat-icon material-symbols-outlined sun icon ${
              theme === "light" && "active"
            }`}
          >
            light_mode
          </i>
          <label className="switch">
            <input type="checkbox" className="checkbox" onClick={handleTheme} />
            <span
              className={`slider ${theme === "dark" ? " slider-active" : ""}`}
            ></span>
          </label>
          <i
            className={`mat-icon material-symbols-outlined moon icon ${
              theme === "dark" && "active"
            }`}
          >
            dark_mode
          </i>
          <span className="mdtxt ms-2">Dark mode</span>
        </div>
      </div>
    </>
  );
};

export default Setting;
