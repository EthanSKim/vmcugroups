"use client";

import Image from "next/image";
import Link from "next/link";
import Select from "../select/Select";
import avatar_1 from "/public/images/avatar-1.png";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const gatheringTypes = [
  { id: 1, name: "Choose Type" },
  { id: 2, name: "Friday Gathering" },
  { id: 3, name: "Lunch Buddies" },
];



const GroupCreateForm = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const router = useRouter();

  const handleChangeName = (e:any) => {
    setName(e.target.value);
  }

  const handleChangeType = (value:any) => {
    setType(value);
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (type == "Choose Type") {
      alert("please select");
    } else {
      try {
        await axios.post("https://hotgirlcom3103.herokuapp.com/createGroup", {name, type}).then(
          (response) => {
            if (response.statusText == "OK") {
              console.log(response.data);
              router.push("/groups");
            }
          }
        )
      } catch (err) {
        console.log(err);
      }
    }
  }


  return (
    <div className="single-box p-5">
      <div className="d-block d-lg-none position-absolute end-0 top-0">
        {/* <button className="button profile-close">
          <i className="material-symbols-outlined mat-icon fs-xl">close</i>
        </button> */}
      </div>
      <div className="head-area mb-5">
        <h5>Create Group</h5>
      </div>
      <div className="profile-picture d-flex gap-2 mb-5 align-items-center">
        <div className="avatar position-relative">
          <Image className="avatar-img max-un" src={avatar_1} alt="avatar" />
        </div>
        <div className="text-area">
          <h6 className="m-0 mb-1">
            <Link href="/profile/post">Lerio Mao</Link>
          </h6>
          <p className="mdtxt">Admin</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="text-center d-grid gap-4">
        <div className="input-area second">
          <input type="text" placeholder="Group name" name="name" required onChange={handleChangeName} value={name} />
        </div>
        <div className="input-area second">
          {/* Select */}
          <Select data={gatheringTypes} handleTypeChange={handleChangeType}/>
        </div>
        {/* <div className="input-area second">
          <input type="text" placeholder="Invite Friends" required />
        </div> */}
        <div className="btn-area">
          <button type="submit" className="cmn-btn">
            Create Group
          </button>
          {/* <Link href="/group-create-2" className="cmn-btn">
            Create Group
          </Link> */}
        </div>
      </form>
    </div>
  );
};

export default GroupCreateForm;
