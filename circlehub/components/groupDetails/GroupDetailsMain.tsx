"use client";
import { useEffect, useState } from "react";
import GroupDetailsMiddle from "../common/GroupDetailsMiddle";
import HomeLeft from "../menu/HomeLeft";
import GroupHead from "./GroupHead";
import axios from "axios";

interface RequestProps {
  id: string;
  name: string;
  year: string;
  major: string;
  avatar: string;
}

const GroupDetailsMain = ({curUser, groupId}:{curUser:RequestProps, groupId:Number}) => {
  const initialState = {id:"", name:"", members:[], type:"", count:0};
  const [groupDetails, setGroupDetails] = useState(initialState);

  const getGroupDetails = async () => {
    try {
      await axios.post("https://hotgirlcom3103.herokuapp.com/getGroupDetails", {groupId}).then((response) => {
        if (response.statusText == "OK") {
          setGroupDetails(response.data);
        }
      })
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      getGroupDetails();
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <main className="main-content">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            {/* Home Left  */}
            <HomeLeft clss="d-lg-none" curUser={curUser}/>
          </div>
          <div className="col-xl-9 col-lg-8">
            {/* Group Details Middle */}
            <GroupDetailsMiddle groupDetails={groupDetails}>
              {/* Group Head */}
              <GroupHead groupDetails={groupDetails} />
            </GroupDetailsMiddle>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GroupDetailsMain;
