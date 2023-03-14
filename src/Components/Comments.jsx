import { useEffect, useState } from "react";
import { fetchComments } from "../api";

export default function Comments({ review_id }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments(review_id).then((res) => {
      setComments(res);
    });
  }, [review_id]);

  return (
    <section className="CommentsComponent">
      {comments.length ? (
        <div className="commentsList">
          {comments.map((comment) => {
            return (
              <div
                className="singleComment"
                id={comment.comment_id}
                key={comment.comment_id}>
                <div className="commentBody">
                  <p className="commentText">{comment.body}</p>
                  <p className="votes">{comment.votes} votes</p>
                  <p className="date">
                    Posted: {new Date(comment.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span>{comment.author}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="noComments">
          <p>No comments</p>
        </div>
      )}
    </section>
  );
}
