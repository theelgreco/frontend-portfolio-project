import { useParams } from "react-router-dom";
import { fetchReviewById } from "../utils/api";
import { useState, useEffect } from "react";
import Comments from "./Comments";

export default function SingleReview({ votedReviews, handleVoteClick }) {
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchReviewById(review_id).then((res) => {
      if (
        Object.keys(votedReviews).includes(res.review_id.toString()) &&
        votedReviews[res.review_id]
      ) {
        res.className = "votes voted";
      } else {
        res.className = "votes";
      }
      setSingleReview(res);
      setIsLoading(false);
    });
  }, [review_id]);

  return (
    <main className="SingleReviewComponent">
      <section>
        {isLoading ? (
          <h1 className="loading">LOADING</h1>
        ) : (
          <div className="singleReview">
            <h2>{singleReview.title}</h2>
            <p>By {singleReview.owner}</p>
            <img
              src={singleReview.review_img_url}
              alt={singleReview.title}></img>
            <div className="reviewBody">
              <p>{singleReview.review_body}</p>
              <p
                className={singleReview.className}
                onClickCapture={handleVoteClick}
                id={singleReview.review_id}>
                Votes: <span id="voteCount">{singleReview.votes}</span>
              </p>
              <p className="date">
                Posted: {new Date(singleReview.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </section>
      {isLoading ? <></> : <Comments review_id={review_id} />}
    </main>
  );
}
