import { useEffect, useState } from "react";
import { fetchComments, deleteComment } from "../utils/api";
import CommentForm from "./CommentForm";

export default function Comments({ review_id }) {
  const [comments, setComments] = useState([]);
  const [popupClass, setPopupClass] = useState("popup hidden");
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    fetchComments(review_id).then((res) => {
      setComments(res);
    });
  }, [review_id, isDeleting, isPosting]);

  function handleDelete(e) {
    setCommentToDelete(e.target.parentNode.parentNode.id);
    setPopupClass("popup delete");
  }

  function confirmDelete(e) {
    if (e.target.value === "yes") {
      setIsDeleting(true);
      deleteComment(commentToDelete).then(() => {
        setPopupClass("popup hidden");
        setIsDeleting(false);
      });
    } else {
      setPopupClass("popup hidden");
    }
  }

  return (
    <section className="CommentsComponent">
      <CommentForm
        comments={comments}
        setComments={setComments}
        review_id={review_id}
        isPosting={isPosting}
        setIsPosting={setIsPosting}
      />

      <div className={popupClass}>
        {isDeleting ? (
          <h1 className="loading">Deleting</h1>
        ) : (
          <div className="popupContainer">
            <p>Are you sure you want to delete this review?</p>
            <div className="deleteButtons">
              <button value="yes" onClick={confirmDelete}>
                YES
              </button>
              <button value="no" onClick={confirmDelete}>
                NO
              </button>
            </div>
          </div>
        )}
      </div>

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
                  <div className="deleteIcon" onClick={handleDelete}></div>
                </div>
                <div className="author">
                  <span>{comment.author}</span>
                </div>
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
