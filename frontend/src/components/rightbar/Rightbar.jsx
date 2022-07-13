import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/api/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (e) {
        console.log(e);
      }
    };
    user && getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/api/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/api/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (e) {
      //console.log(e);
    }
  };
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img
            src={`${PUBLIC_FOLDER}gift.png`}
            alt=""
            className="birthdayImg"
          />
          <span className="birthdayText">
            <b>Ekta and 1 other</b>
          </span>
        </div>
        <img src={`${PUBLIC_FOLDER}ad.png`} alt="" className="rightbarAd" />
        <h4 className="rightarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online user={u} key={u.id} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information </h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship: </span>
            <span className="rightbarInfoValue">{user.relationship}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends </h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link to={"/profile/" + friend.username} key={friend._id}>
              <div className="rightbarFollowing" key={friend._id}>
                <img
                  src={
                    friend.profilePicture !== ""
                      ? PUBLIC_FOLDER + friend.profilePicture
                      : PUBLIC_FOLDER + "person/avatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingNm">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
