import { useParams } from "react-router-dom";
import { fetchReviewById } from "../api";
import { useState, useEffect } from "react";

export default function SingleReview() {
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});

  useEffect(() => {
    fetchReviewById(review_id).then((res) => {
      setSingleReview(res);
    });
  }, []);

  return (
    <main className="SingleReviewComponent">
      <div className="singleReview">
        <h2>{singleReview.title}</h2>
        <p>By {singleReview.owner}</p>
        <img src={singleReview.review_img_url}></img>
        <div className="reviewBody">
          <p>{singleReview.review_body}</p>
          <p>
            Posted: {new Date(singleReview.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </main>
  );
}
