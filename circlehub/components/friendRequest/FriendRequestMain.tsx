"use client";
import userData from "@/data/userData";
import VerticalRequestCard from "../cards/VerticalRequestCard";
import FriendLeftMenu from "../menu/FriendLeftMenu";
import { useEffect, useState } from "react";
import axios from "axios";

const APIURL = "https://vmcugroupapi-9b61193cdcaa.herokuapp.com";
const LOCALURL = "http://localhost:8800";

interface RequestProps {
  id: string;
  name: string;
  year: string;
  major: string;
  avatar: string;
}

const FriendRequestMain = ({curUser}:{curUser:RequestProps}) => {
  const initialState = [{id:"", name:"", major:"", year:"", avatar:"", groups:[]}];
  const [members, setMembers] = useState(initialState);

  const getAllMembers = async () => {
    try {
      await axios.get(`${APIURL}/getAllMembers`).then((response) => {
        if (response.statusText == "OK") {
          setMembers(response.data);
        }
      })
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllMembers();
  }, [])
  return (
    <main className="main-content">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            {/* Friend Left Menu */}
            <FriendLeftMenu curUser={curUser} />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="row cus-mar friend-request">
              {members.map((itm) => (
                <div key={itm.id} className="col-xl-4 col-sm-6 col-8">
                  {/* Vertical Request Card   */}
                  <VerticalRequestCard data={itm} reqType="Confirm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FriendRequestMain;
