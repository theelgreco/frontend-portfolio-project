import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../utils/api";

export default function Categories() {
  const { category } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews(category).then((res) => {
      setReviews(res);
    });
  }, []);

  return (
    <main>
      <h1>Categories</h1>

      {reviews.map((review) => {
        return <h1>{review.title}</h1>;
      })}
    </main>
  );
}
