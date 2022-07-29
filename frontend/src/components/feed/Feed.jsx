import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { authRequest } from "../../_helpers/auth-request";

export default function Feed({ id }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const url = id ? "/posts/profile/" + id : `/posts`;
      const res = await axios.get(url, authRequest(user));
      setPosts(
        res.data.length === 0
          ? []
          : res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
      );
    };
    user && fetchPosts();
  }, [id, user]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!id || id === user.id) && <Share />}
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <div className="noposts">No posts</div>
        )}
      </div>
    </div>
  );
}
