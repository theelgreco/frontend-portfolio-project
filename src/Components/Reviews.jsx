import { useState, useEffect } from "react";
import { fetchReviews } from "../api";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews().then((res) => {
      setReviews(res);
      setPages(Math.ceil(res.length / 6));
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {}, []);

  function createNestedArrays(arr, num) {
    const nestedArr = [];

    for (let i = 0; i < num; i++) {
      nestedArr.push([]);
    }

    let startingIndex = 0;
    nestedArr.forEach((array) => {
      for (let i = 0; i < 6; i++) {
        if (!arr[startingIndex]) return;
        array.push(arr[startingIndex]);
        startingIndex++;
      }
    });

    return nestedArr;
  }

  function handleSelect(e) {
    setCurrentPage(e.target.value);
  }

  return (
    <main className="Reviews">
      <h1>REVIEWS</h1>
      <select onChange={handleSelect}>
        {createNestedArrays(reviews, pages).map((arr, index) => {
          return (
            <option value={index} key={index}>
              Page {index + 1}
            </option>
          );
        })}
      </select>
      <section className="reviewsContainer">
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          createNestedArrays(reviews, pages)[currentPage].map((review) => {
            return (
              <div key={review.review_id} className="singleReview">
                <img src={review.review_img_url} alt={review.title}></img>
                <div>
                  <h2 className="reviewTitle">{review.title}</h2>
                  <p>By {review.owner}</p>
                  <p className="reviewBody">{review.review_body}</p>
                  <p className="reviewBody">
                    Posted: {Date(review.created_at)}
                  </p>
                  <p>Votes: {review.votes}</p>
                </div>
              </div>
            );
          })
        )}
      </section>
    </main>
  );
}
