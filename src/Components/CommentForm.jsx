import { useState, useEffect } from "react";
import { fetchUsers } from "../utils/api";
import { removeImageBackground } from "../utils/utils";

export default function CommentForm({ comments, setComments }) {
  //   const [newComment, setNewComment] = useState({});
  const [users, setUsers] = useState([]);
  const [usersClass, setUsersClass] = useState("users hidden");

  useEffect(() => {
    fetchUsers().then((res) => {
      res.forEach((user) => {
        removeImageBackground(user.avatar_url).then((data) => {
          user.avatar_url = data;
          user.className = "userIcon";
        });
        setUsers(res);
      });
      console.log(res);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(comments);
    console.log(e.target.value);
  }

  function handleClick(e) {
    if (e.target.id === "closeBtn") {
      setUsersClass("users hidden");
    } else {
      setUsersClass("users");
    }
  }

  function selectUser(e) {
    const selectedUser = users.map((user) => {
      if (user.username !== e.target.id) {
        user.className = "hidden";
      } else {
        user.className += " selected";
      }
      return user;
    });

    setUsers(selectedUser);
  }

  return (
    <section>
      <form className="commentForm" onSubmit={handleSubmit}>
        <textarea
          type="textarea"
          id="textForm"
          onClick={handleClick}
          required></textarea>
      </form>
      <div className={usersClass}>
        <textarea className="commentForm"></textarea>
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
