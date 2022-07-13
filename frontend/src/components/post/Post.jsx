import "./post.css";
import { MoreVert, Delete } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);
  const [user, setUser] = useState({});
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/api/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (e) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + post._id, {
        data: { userId: currentUser._id },
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
    setMoreOptions(!moreOptions);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PUBLIC_FOLDER + user.profilePicture
                    : PUBLIC_FOLDER + "person/avatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user?.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            {currentUser && currentUser._id === post.userId && (
              <MoreVert
                className="postTopRightBtn"
                onClick={() => setMoreOptions(!moreOptions)}
              />
            )}
            <div
              className="moreOptions"
              style={{ display: moreOptions ? "block" : "none" }}
            >
              <span
                className="option"
                onClick={() => {
                  if (window.confirm("Delete the item?")) {
                    handleDelete();
                  } else {
                    setMoreOptions(!moreOptions);
                  }
                }}
              >
                <Delete /> Delete
              </span>
            </div>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {post.img && (
            <img src={PUBLIC_FOLDER + post?.img} className="postImg" alt="" />
          )}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PUBLIC_FOLDER}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PUBLIC_FOLDER}heart.png`}
              alt=""
            />
            <span className="postLikeCounter">{like} people likes it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">10 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
