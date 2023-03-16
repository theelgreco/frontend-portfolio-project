import { useState, useEffect } from "react";
import { fetchUsers } from "../utils/api";
import { removeImageBackground } from "../utils/utils";
import { postComment } from "../utils/api";

export default function CommentForm({ review_id }) {
  const [newComment, setNewComment] = useState({});
  const [users, setUsers] = useState([]);
  const [usersClass, setUsersClass] = useState("users hidden");
  const [isSignedIn, setIsSignedin] = useState(false);

  useEffect(() => {
    fetchUsers().then((res) => {
      res.forEach((user) => {
        removeImageBackground(user.avatar_url).then((data) => {
          user.avatar_url = data;
          user.className = "userIcon";
        });
        setUsers(res);
      });
    });
  }, []);

  function handleChange(e) {
    setNewComment({ ...newComment, body: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    postComment(newComment, review_id);
  }

  function handleClick(e) {
    if (e.target.id === "closeBtn") {
      setUsersClass("users hidden");
    } else {
      setUsersClass("users");
    }
  }

  function selectUser(e) {
    if (!isSignedIn) {
      const selectedUser = users.map((user) => {
        if (user.username !== e.target.id) {
          user.className = "hidden";
        } else {
          user.className += " selected";
        }
        return user;
      });

      setNewComment({ ...newComment, username: e.target.id });
      setIsSignedin(true);
      setUsers(selectedUser);
    }
  }

  function changeProfile(e) {
    e.preventDefault();
    setIsSignedin(false);
    const allUsers = users.map((user) => {
      user.className = "userIcon";
      return user;
    });
    setUsers(allUsers);
  }

  return (
    <section>
      <button className="commentBtn" onClick={handleClick} required>
        WRITE A COMMENT
      </button>
      <div className={usersClass}>
        {isSignedIn ? (
          <>
            <form onSubmit={handleSubmit}>
              <textarea
                className="commentForm"
                onChange={handleChange}></textarea>
              <button className="commentBtn submit">Post Comment</button>
            </form>
          </>
        ) : (
          <></>
        )}
        {users.map((user) => {
          return (
            <div
              className={user.className}
              id={user.username}
              onClick={selectUser}>
              <p id={user.username}>{user.username}</p>
              <img
                src={user.avatar_url}
                id={user.username}
                alt={user.username}></img>
              {isSignedIn ? (
                <button className="commentBtn profile" onClick={changeProfile}>
                  Change profile
                </button>
              ) : (
                <></>
              )}
            </div>
          );
        })}
        <div className="close">
          <p onClick={handleClick} id={"closeBtn"}>
            X
          </p>
        </div>
      </div>
    </section>
  );
}
