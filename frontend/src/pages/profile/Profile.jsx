import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { authRequest } from "../../_helpers/auth-request";
import "./profile.css";

export default function Profile({ currentUser }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `/users/${params.id}`,
        authRequest(currentUser)
      );
      setUser(res.data);
    };
    fetchUser();
  }, [params.id, currentUser]);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  user.coverPicture
                    ? PUBLIC_FOLDER + user.coverPicture
                    : PUBLIC_FOLDER + "post/3.jpeg"
                }
                alt=""
                className="profileCoverImg"
              />
              <img
                src={
                  user.profilePicture
                    ? PUBLIC_FOLDER + user.profilePicture
                    : PUBLIC_FOLDER + "person/avatar.png"
                }
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.firstName}</h4>
              <span className="profileInfoDesc">{user.lastName}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed id={params.id} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
