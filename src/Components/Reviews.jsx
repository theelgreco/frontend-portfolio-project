import { useState, useEffect } from "react";
import { fetchReviews } from "../api";
import { Link } from "react-router-dom";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setIsLoading(true);
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

  function changeUrl(e) {
    setUrl(`/${e.target.id}`);
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
          <h1>LOADING...</h1>
        ) : (
          createNestedArrays(reviews, pages)[currentPage].map((review) => {
            return (
              <Link
                to={url}
                id={review.review_id}
                key={review.review_id}
                onMouseEnter={changeUrl}
                className="reviewLink">
                <div
                  id={review.review_id}
                  key={review.review_id}
                  className="review">
                  <img src={review.review_img_url} alt={review.title}></img>
                  <div>
                    <h2 className="reviewTitle">{review.title}</h2>
                    <p>By {review.owner}</p>
                    <p>Votes: {review.votes}</p>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </section>
    </main>
  );
}
