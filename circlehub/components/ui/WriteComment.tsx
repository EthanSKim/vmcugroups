"use client";

import Image from "next/image";
import Link from "next/link";
import add_post_avatar from "/public/images/add-post-avatar.png";
import { useState } from "react";
import axios from "axios";

const WriteComment = () => {
  const [secretKeyword, setSecretKeyword] = useState("");
  const handleChangeInput = (e:any) => {
    const {value} = e.target;
    setSecretKeyword(value);
  }
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/adminAuthorize", {secretKeyword}).then((response) => {
        localStorage.setItem("@admin", JSON.stringify(response.data));
      })
    } catch(err) {
      alert("You can't comment yet!");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex mt-5 gap-3">
        <div className="profile-box d-none d-xxl-block">
          <Link href="#">
            <Image src={add_post_avatar} className="max-un" alt="icon" />
          </Link>
        </div>
        <div className="form-content input-area py-1 d-flex gap-2 align-items-center w-100">
          <input placeholder="Write a comment.." name="secretkey"required onChange={handleChangeInput}/>
          <div className="file-input d-flex gap-1 gap-md-2">
            <div className="file-upload">
              <label className="file">
                <span className="file-custom border-0 d-grid text-center">
                  <span className="material-symbols-outlined mat-icon m-0 xxltxt">
                    gif_box
                  </span>
                </span>
              </label>
            </div>
            <div className="file-upload">
              <label className="file">
                <span className="file-custom border-0 d-grid text-center">
                  <span className="material-symbols-outlined mat-icon m-0 xxltxt">
                    perm_media
                  </span>
                </span>
              </label>
            </div>
            <span className="mood-area">
              <span className="material-symbols-outlined mat-icon m-0 xxltxt">
                mood
              </span>
            </span>
          </div>
        </div>
        <div className="btn-area d-flex">
          <button type={"submit"} className="cmn-btn px-2 px-sm-5 px-lg-6">
            <i className="material-symbols-outlined mat-icon m-0 fs-xxl">
              near_me
            </i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default WriteComment;
