"use client";
import groupData from "@/data/groupData";
import GroupCard from "../cards/GroupCard";
import { useEffect, useState } from "react";
import axios from "axios";

const PublicTab = ({tab, admin}:{tab:String, admin:boolean}) => {
  const initialState = [{id:"", name:"", members:[], type:"", count:0, locked:false}];
  const [groups, setGroups] = useState(initialState);

  const getAllGroups = async () => {
    try {
      await axios.get("http://localhost:8800/getAllGroups").then((response) => {
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
      getAllGroups();
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="row cus-mar friend-request">
      {groups.toReversed().map((itm) => (
        <div key={itm.id} className="col-xl-4 col-sm-6 col-8">
          {/* Group Card  */}
          <GroupCard data={itm} tab={"public"} admin={admin}/>
        </div>
      ))}
    </div>
  );
};

export default PublicTab;
