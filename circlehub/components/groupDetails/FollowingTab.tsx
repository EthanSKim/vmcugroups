import followData from "@/data/followData";
import FollowCard from "../cards/FollowCard";
import { useEffect, useState } from "react";
import axios from "axios";
const userKey = "@userData"
const APIURL = "https://vmcugroupapi-9b61193cdcaa.herokuapp.com";
const LOCALURL = "http://localhost:8800";
const FollowingTab = ({groupId}:{groupId:String}) => {
  const [searchName, setSearchName] = useState("");

  const initialState = [{id:"", name:"", year:"", major:"", avatar:""}];
  const [subGroupMembers, setSubGroupMembers] = useState(initialState);
  const [success, setSuccess] = useState(false);

  const changeSearchName = (event:any) => {
    setSearchName(event.target.value);
  }

  const getSubGroupMembers = async () => {
    try {
      const userDataStr = localStorage.getItem(userKey);
      if (userDataStr) {
        const userId = JSON.parse(userDataStr).id;
        await axios.post(`${APIURL}/getSubGroupMembersInfo`, {userId, groupId}).then((response) => {
          setSubGroupMembers(response.data);
          setSuccess(true);
        })
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSubGroupMembers();
  }, [groupId])
  return (
    <>
      <div className="search-area d-center my-7 flex-wrap gap-2 justify-content-between">
        <div className="total-followers">
          <h6>{success ? subGroupMembers.length : 0} Members</h6>
        </div>
        <form
          action="#"
          className="d-flex align-items-stretch justify-content-between gap-4"
        >
          <div className="input-area py-2 w-100 gap-2 d-flex align-items-center">
            <i className="material-symbols-outlined mat-icon">search</i>
            <input type="text" placeholder="Search" onChange={changeSearchName} />
          </div>
        </form>
      </div>
      <div className="row">
        {subGroupMembers.map(function(data) {
          if (data.name.toLowerCase().includes(searchName.toLowerCase()) || data.major.toLowerCase().includes(searchName.toLowerCase()) || data.year.toLowerCase().includes(searchName.toLowerCase())) {
            return (
              <div key={data.id} className="col-md-6">
                {/* Follow Card */}
                <FollowCard data={data} />
              </div>)
          }
        })}
        {/* <div className="col-12 my-5 text-center">
          <button className="cmn-btn alt third fw-600">Load More</button>
        </div> */}
      </div>
    </>
  );
};

export default FollowingTab;
