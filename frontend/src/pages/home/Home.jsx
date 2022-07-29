import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import "./home.css";
import { useContext, useEffect } from "react";
import axios from "axios";
import { authRequest } from "../../_helpers/auth-request";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const { user, dispatch } = useContext(AuthContext);
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends", authRequest(user));
      dispatch({ type: "FRIENDS", payload: res.data });
    };
    getFriends();
    const getOnlineFriends = async () => {
      const res = await axios.get("/users/onlineFriends", authRequest(user));
      dispatch({ type: "ONLINE_FRIENDS", payload: res.data });
    };
    getOnlineFriends();
  }, [user]);
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
