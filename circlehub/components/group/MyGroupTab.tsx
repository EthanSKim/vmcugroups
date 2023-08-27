"use client";
import groupData from "@/data/groupData";
import GroupCard from "../cards/GroupCard";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const APIURL = "https://vmcugroupapi-9b61193cdcaa.herokuapp.com";
const LOCALURL = "http://localhost:8800";

interface RequestProps {
  id: string;
  name: string;
  year: string;
  major: string;
  avatar: string;
}

const MyGroupTab = ({curUser, tab, admin}: {curUser:RequestProps, tab:String, admin:boolean}) => {
  const initialState = [{id:"", name:"", members:[], type:"", count:0, locked:false}];
  const [groups, setGroups] = useState(initialState);
  const getJoinedGroups = async () => {
    try {
      await axios.post(`${APIURL}/getJoinedGroups`, {id:curUser.id}).then((response) => {
        if (response.statusText == "OK") {
          setGroups(response.data);
        }
      })
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getJoinedGroups();
    }, 1000);
    return () => clearTimeout(timer);
  });
  return (
    <div className="row cus-mar friend-request">
      {groups.reverse().map((itm) => (
        <div key={itm.id} className="col-xl-4 col-sm-6 col-8">
          {/* Group Card  */}
          <GroupCard data={itm} tab={"mygroup"} admin={admin}/>
        </div>
      ))}
    </div>
  );
};

export default MyGroupTab;
