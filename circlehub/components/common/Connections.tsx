"use client";
import { useEffect, useState } from "react";
import FollowersTab from "../groupDetails/FollowersTab";
import FollowingTab from "../groupDetails/FollowingTab";
import axios from "axios";
import { useRouter } from "next/navigation";

const APIURL = "https://vmcugroupapi-9b61193cdcaa.herokuapp.com";
const LOCALURL = "http://localhost:8800";

interface RequestProps {
  id: string;
  name: string;
  members: string[];
  type: string;
  count: Number;
  locked: boolean;
}

const Connections = ({ clss = "col-xxl-8", groupDetails}: {clss:string, groupDetails:RequestProps}) => {
  const initialState = [{id:"", name:"", major:"", year:"", avatar:"", groups:[]}];
  const initialSubState = [[{id:"", name:"", major:"", year:"", avatar:"", groups:[]}]];
  const router = useRouter();
  const [members, setMembers] = useState(initialState);
  const [subgroups, setSubGroups] = useState(initialSubState);
  const getGroupMembers = async () => {
    try {
      await axios.post(`${APIURL}/getMembersInfo`, groupDetails.members).then((response) => {
        setMembers(response.data);
      })
    } catch (err) {
      console.log(err);
    }
  };

  const createGroups = () => {
    const number = prompt("How many groups do you want?", "0");
    if (number) {
      if (isNaN(Number(number))) {
        alert("Please enter a number!");
      } else {
        const groupCount = parseInt(number);
        createRandomGroups(groupCount);
      }
    }
  };

  const createRandomGroups = (k: number) => {
    if (k <= 0 || members.length === 0) {
      alert("So.. no groups..?");
      return [];
    }

    const shuffledMembers = [...members].sort(() => Math.random() - 0.5);

    const groupSize = Math.ceil(members.length / k);

    const tempGroups = [];
    for (let i=0; i< k; i++) {
      const subGroup = shuffledMembers.splice(0, groupSize);
      tempGroups.push(subGroup);
    }

    let remainingMembers = shuffledMembers.length;
    while (remainingMembers > 0) {
      for (let i=0; i<tempGroups.length && remainingMembers > 0; i++) {
        tempGroups[i].push(shuffledMembers.pop()!);
        remainingMembers--;
      }
    }
    setSubGroups(tempGroups);
    sendSubGroups(tempGroups);
  };

  const sendSubGroups = async (tempGroups:any) => {
    try {
      await axios.post(`${APIURL}/createSubGroups`, {tempGroups, groupId:groupDetails.id}).then((response) => {
        location.reload();
      })
    } catch (err) {
      console.log(err);
    }
  };

  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    const adminStr =localStorage.getItem("@admin");
    if (adminStr) {
      const isAdmin = JSON.parse(adminStr).auth;
      setAdmin(isAdmin);
    }
  }, []);

  useEffect(() => {
    getGroupMembers();
  }, [groupDetails]);
  return (
    <div className={clss}>
      <div className="single-box p-5">
        <ul className="nav flex-wrap gap-2 tab-area" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link d-center active"
              id="followers-tab"
              data-bs-toggle="tab"
              data-bs-target="#followers-tab-pane"
              type="button"
              role="tab"
              aria-controls="followers-tab-pane"
              aria-selected="true"
            >
              All
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="following-tab"
              data-bs-toggle="tab"
              data-bs-target="#following-tab-pane"
              type="button"
              role="tab"
              aria-controls="following-tab-pane"
              aria-selected="false"
              tabIndex={0}
            >
              My Group
            </button>
          </li>
        </ul>
      </div>
      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="followers-tab-pane"
          role="tabpanel"
          aria-labelledby="followers-tab"
          tabIndex={0}
        >
          {
            admin ? 
            groupDetails.locked ? <button onClick={createGroups} className="cmn-btn second">Create Random Groups</button> : <button className="cmn-btn third">!Lock Group to Create Random Groups!</button> : 
            <></>
          }
          {/* Followers Tab */}
          <FollowersTab count={groupDetails.count} members={members}/>
        </div>
        <div
          className="tab-pane fade"
          id="following-tab-pane"
          role="tabpanel"
          aria-labelledby="following-tab"
          tabIndex={0}
        >
          {/* Following Tab */}
          <FollowingTab groupId={groupDetails.id}/>
        </div>
      </div>
    </div>
  );
};

export default Connections;
