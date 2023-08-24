"use client";

import FriendRequestMain from "@/components/friendRequest/FriendRequestMain";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const userKey = "@userData"
export default function FriendRequest() {
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
      <FriendRequestMain curUser={curUser}/>
    </>
  );
}
