import { useParams } from "react-router-dom";
import { fetchReviewById } from "../utils/api";
import { useState, useEffect } from "react";
import Comments from "./Comments";

export default function SingleReview() {
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchReviewById(review_id).then((res) => {
      setSingleReview(res);
      setIsLoading(false);
    });
  }, [review_id]);

  return (
    <main className="SingleReviewComponent">
      <section>
        {isLoading ? (
          <h1>LOADING...</h1>
        ) : (
          <div className="singleReview">
            <h2>{singleReview.title}</h2>
            <p>By {singleReview.owner}</p>
            <img
              src={singleReview.review_img_url}
              alt={singleReview.title}></img>
            <div className="reviewBody">
              <p>{singleReview.review_body}</p>
              <p className="date">
                Posted: {new Date(singleReview.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </section>
      <Comments review_id={review_id} />
    </main>
  );
}
