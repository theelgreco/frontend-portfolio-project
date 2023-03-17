import { useState, useEffect } from "react";
import { removeImageBackground } from "../utils/utils";
import { postComment, fetchUsers } from "../utils/api";

export default function CommentForm({ review_id }) {
  const [newComment, setNewComment] = useState({});
  const [users, setUsers] = useState([]);
  const [usersClass, setUsersClass] = useState("popup users hidden");
  const [isSignedIn, setIsSignedin] = useState(false);
  const [formText, setFormText] = useState("");
  const [isPosting, setIsPosting] = useState(false);

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
    setFormText(e.target.value);
    setNewComment({ ...newComment, body: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formText.length) {
      setFormText("");
      setIsPosting(true);
      users.map((user) => {
        return (user.className = "hidden");
      });
      postComment(newComment, review_id).then(() => {
        setUsersClass("hidden");
        setIsPosting(false);
        setIsSignedin(false);
        users.map((user) => {
          return (user.className = "userIcon");
        });
      });
    }
  }

  function handleClick(e) {
    if (e.target.id === "closeBtn") {
      setUsersClass("popup users hidden");
    } else {
      setUsersClass("popup users");
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
      <button className="commentBtn write" onClick={handleClick} required>
        WRITE A COMMENT
      </button>
      <div className={usersClass}>
        {isPosting ? <h1 className="posting">POSTING</h1> : <></>}
        {isSignedIn && !isPosting ? (
          <>
            <form onSubmit={handleSubmit}>
              <textarea
                className="commentForm"
                value={formText}
                onChange={handleChange}
                required></textarea>
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
              key={user.username}
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
        {!isSignedIn ? (
          <h1 className="profileTitle">choose a profile:</h1>
        ) : (
          <></>
        )}
        <div className="close">
          <p onClickCapture={handleClick} id={"closeBtn"}>
            X
          </p>
        </div>
      </div>
    </section>
  );
}
