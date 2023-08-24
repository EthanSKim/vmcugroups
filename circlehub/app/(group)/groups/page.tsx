"use client";

import GroupMain from "@/components/group/GroupMain";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const userKey = "@userData"
export default function Groups() {
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
      <GroupMain curUser={curUser}/>
    </>
  );
}
