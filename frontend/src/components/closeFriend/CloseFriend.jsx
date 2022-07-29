import "./closeFriend.css";

export default function CloseFriend({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img
        src={
          user.profilePicture
            ? PUBLIC_FOLDER + user.profilePicture
            : PUBLIC_FOLDER + "person/avatar.png"
        }
        alt=""
        className="sidebarFriendImg"
      />
      <span className="sidebarFriendName">
        {user.firstName} {user.lastName}
      </span>
    </li>
  );
}
