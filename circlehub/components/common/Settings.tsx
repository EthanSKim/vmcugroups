"use client";

import Image from "next/image";
import CrudAction from "../ui/CrudAction";
import PrivacyAction from "../ui/PrivacyAction";
import profile_cover from "/public/images/profile-cover.png";
import profile_picture from "/public/images/profile-picture.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { userAgent } from "next/server";

interface RequestProps {
  id: string;
  name: string;
  year: string;
  major: string;
  avatar: string;
}
const userKey = "@userData"
const Settings = ({ curUser }: { curUser: RequestProps }) => {
  const [userData, setUserData] = useState(curUser);
  const {name, major, year} = userData;

  const {id, avatar} = curUser;

  const router = useRouter();


  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value, id:id, avatar:avatar });
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (userData.year == "not selected") {
      alert("please select");
    } else {
      try {
        await axios.post("https://vmcugroupapi-9b61193cdcaa.herokuapp.com/changeInfo", userData).then((response) => {
          if (response.statusText == "OK") {
            localStorage.setItem(userKey, JSON.stringify(response.data));
            router.push("/");
          }
        })
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <>
      {/* <div className="single-box p-sm-5 p-3">
        <div className="row gap-6">
          <div className="col-xxl-2 col-md-3 col-sm-5 col-6 pe-0">
            <div className="upload-single">
              <div className="head-area mb-2 text-start">
                <h6>Profile Image</h6>
              </div>
              <div className="profile-picture text-start">
                <Image
                  className="preview-image w-100"
                  src={profile_picture}
                  alt="Preview Image"
                />
              </div>
              <div className="file-upload">
                <label className="file text-start mt-2">
                  <input type="file" required />
                  <span className="cmn-btn">Change Profile</span>
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="upload-single cover-img">
              <div className="head-area mb-2 text-start">
                <h6>Cover Image</h6>
              </div>
              <div className="profile-picture text-start">
                <Image
                  className="preview-image w-100"
                  src={profile_cover}
                  alt="Preview Image"
                />
              </div>
              <div className="file-upload">
                <label className="file text-start mt-2">
                  <input type="file" required />
                  <span className="cmn-btn">Change Cover photo</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="single-box text-start p-sm-5 p-3">
        <div className="head-area mb-6">
          <h6>Change Name </h6>
        </div>
        <form onSubmit={handleSubmit} className="text-center d-grid gap-4">
          <div className="row">
            <div className="col-sm-6">
              <div className="single-input text-start">
                <label htmlFor="name">Name</label>
                <div className="input-area second">
                  <input type="text" placeholder="Type name" name="name" required onChange={handleChangeInput} value={name} />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="single-input text-start">
                <label htmlFor="year">Year</label>
                <div className="second">
                  <select id="year" name="year" onChange={handleChangeInput} value={year} >
                    <option value="not selected">select</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="More">More</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="single-input text-start">
                <label htmlFor="major">Major</label>
                <div className="input-area second">
                  <input type="text" placeholder="Type name" name="major" required onChange={handleChangeInput} value={major} />
                </div>
              </div>
            </div>
            {/* <div className="col-sm-5 mt-4 d-center justify-content-end">
              <div className="single-input d-center text-start">
                Privacy Action
                <PrivacyAction />

                Crus Action
                <CrudAction />
              </div>
            </div> */}
            <div className="col-sm-12 mt-4">
              <div className="btn-area text-end">
                <button type={"submit"} className="cmn-btn">
                  Saved Change
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Settings;
