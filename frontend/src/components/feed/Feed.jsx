import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { authRequest } from "../../_helpers/auth-request";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const url = username ? "/posts/profile/" + username : `/posts`;
      const res = await axios.get(url, authRequest(user));
      setPosts(
        res.data.length === 0
          ? []
          : res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
      );
    };
    fetchPosts();
  }, [username, user]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <div className="noposts">No posts</div>
        )}
      </div>
    </div>
  );
}
