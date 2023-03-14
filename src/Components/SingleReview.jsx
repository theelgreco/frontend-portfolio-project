import { useParams } from "react-router-dom";
import { fetchReviewById } from "../api";
import { useState, useEffect } from "react";

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
      {isLoading ? (
        <h1>LOADING...</h1>
      ) : (
        <div className="singleReview">
          <h2>{singleReview.title}</h2>
          <p>By {singleReview.owner}</p>
          <img src={singleReview.review_img_url} alt={singleReview.title}></img>
          <div className="reviewBody">
            <p>{singleReview.review_body}</p>
            <p>
              Posted: {new Date(singleReview.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
