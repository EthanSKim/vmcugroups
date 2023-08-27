import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const APIURL = "https://vmcugroupapi-9b61193cdcaa.herokuapp.com";
const LOCALURL= "http://localhost:8800";

const ContactAction = ({ actionList, groupId }: { actionList: string[][], groupId: string }) => {
  const [action, setAction] = useState("");
  const router = useRouter();
  const handleClick = (e:any) => {
    if (e.target.innerText === "Delete Group") {
      deleteGroup();
    } else if (e.target.innerText === "Clear small groups") {
      clearSubGroups();
    }
  };

  const deleteGroup = async () => {
    router.push("/groups/");
    try {
      await axios.post(`${APIURL}/deleteGroup`, {groupId}).then((response) => {
      })
    } catch(err) {
      console.log(err);
    }
  };

  const clearSubGroups = async () => {
    router.push("/groups");
    try {
      await axios.post(`${APIURL}/clearSubGroups`, {groupId}).then((response) => {
      })
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="btn-group cus-dropdown dropend">
      <button
        type="button"
        className="d-flex dropdown-btn px-2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="material-symbols-outlined fs-xxl m-0">more_horiz</i>
      </button>
      <ul className="dropdown-menu p-4 pt-2">
        {actionList?.map(([itm, icon], i) => (
          <li key={i}>
            <button onClick={handleClick} className="droplist d-flex align-items-center gap-2" value={itm}>
              <i className="material-symbols-outlined mat-icon">{icon}</i>
              <span>{itm}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactAction;
