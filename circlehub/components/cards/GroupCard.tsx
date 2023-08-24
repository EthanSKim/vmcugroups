import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import ContactAction from "../ui/ContactAction";
import avatar_2 from "/public/images/avatar-2.png";
import axios from "axios";
import { useRouter } from "next/navigation";

const userKey = "@userData"

interface GroupProps {
  id: string;
  name: string;
  members: string[];
  type: string;
  count: Number;
  locked: boolean;
}

const GroupCard = ({ data, tab, admin }: { data: GroupProps, tab:String, admin:boolean }) => {
  const { count, type, name, id, members, locked } = data;
  const router = useRouter();

  const handleJoin = async () => {
    try {
      const userDataStr = localStorage.getItem(userKey);
      if (userDataStr) {
        router.push(`/groups/${id}`);
        const userId = JSON.parse(userDataStr).id;
        await axios.post("https://vmcugroupapi-9b61193cdcaa.herokuapp.com/joinGroup", {userId, id});
      }
    } catch (err:any) {
      if(err.response.status == 400) {
        alert("You are in the group");
      } else {
        console.log(err);
      }
    }
  };

  const handleLeave = async () => {
    try {
      const userDataStr = localStorage.getItem(userKey);
      if (userDataStr) {
        const leave = confirm("Are you sure you want to leave?");
        if (leave) {
          const userId = JSON.parse(userDataStr).id;
          await axios.post("https://vmcugroupapi-9b61193cdcaa.herokuapp.com/leaveGroup", {userId, id});
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLock = async () => {
    try {
      await axios.post("https://vmcugroupapi-9b61193cdcaa.herokuapp.com/lockGroup", {id});
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlock = async () => {
    try {
      await axios.post("https://vmcugroupapi-9b61193cdcaa.herokuapp.com/unlockGroup", {id});
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="single-box p-5">
      <div className="avatar-box position-relative">
        {/* <Image className="avatar-img w-100" src={banner_img} alt="avatar" /> */}
        {/* <div className="abs-area w-100 position-absolute top-0 p-3 d-center justify-content-end">
          Contact Action
          <ContactAction
            actionList={[
              ["Unfollow", "person_remove"],
              ["Hide", "hide_source"],
            ]}
          />
        </div> */}
      </div>
      {/* <div className="abs-avatar-item">
        <Image className="avatar-img max-un" src={avt} alt="avatar" />
      </div> */}
      <Link href={`/groups/${id}`}>
        <h6 className="m-0 mb-2 mt-3">{name}</h6>
      </Link>
      <p className="smtxt public-group">{String(count)} members joined</p>
      <p className="smtxt public-group">{type}</p>
      {/* <div className="friends-list d-center mt-3 gap-1 text-center">
        <ul className="d-center">
          <li>
            <Image src={avatar_2} alt="image" />
          </li>
          <li>
            <Image src={avatar_2} alt="image" />
          </li>
          <li>
            <Image src={avatar_2} alt="image" />
          </li>
        </ul>
        <span className="smtxt m-0">30k Member</span>
      </div> */}
      <div className="d-center btn-border pt-5 gap-2 mt-4">
        {
          tab == "public" ? locked ? <button className="cmn-btn fourth">Locked</button> : <button onClick={handleJoin} className="cmn-btn fourth">Join</button>
          : locked ? <button className="cmn-btn alt third">Locked</button> : <button onClick={handleLeave} className="cmn-btn alt third">Leave</button>
        }
        {
          admin ? locked ? 
          <button onClick={handleUnlock} className="cmn-btn third"><i className="material-symbols-outlined mat-icon">lock_open</i>Unlock</button>
          :
          <button onClick={handleLock} className="cmn-btn third"><i className="material-symbols-outlined mat-icon">lock</i>Lock</button>
          :
          <></>
        }
      </div>
    </div>
  );
};

export default GroupCard;
