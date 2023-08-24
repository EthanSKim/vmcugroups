"use client";

import GroupDetailsMain from "@/components/groupDetails/GroupDetailsMain";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const userKey = "@userData"
export default function GroupDetails({params}:{params:any}) {
  const router = useRouter();
  const initialState = {id:"", name:"", year:"", major:"", avatar:""};
  const [curUser, setCurUser] = useState(initialState);

  useEffect(() => {
    const userInfo = localStorage.getItem(userKey);
    if (userInfo == null) {
      router.push("/login");
    } else {
      const userData = JSON.parse(userInfo);
      setCurUser(userData);
    }
  }, []);
  return (
    <>
      <GroupDetailsMain curUser={curUser} groupId={params.groupId}/>
    </>
  );
}
