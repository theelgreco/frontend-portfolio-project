import { useState, useEffect } from "react";
import { fetchReviews } from "../utils/api";
import { Link } from "react-router-dom";
import CategoryButtons from "./CategoryButtons";

export default function Reviews({
  currentPageReviews,
  setCurrentPageReviews,
  selected,
  setSelected,
  votedReviews,
  handleVoteClick,
  createNestedArrays,
  changeUrl,
  categories,
  url,
}) {
  const [reviews, setReviews] = useState([]);
  const [pages, setPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchReviews().then((res) => {
      res.map((review) => {
        if (
          Object.keys(votedReviews).includes(review.review_id.toString()) &&
          votedReviews[review.review_id]
        ) {
          review.className = "votes voted";
        } else {
          review.className = "votes";
        }
        return review;
      });
      setReviews(res);
      setPages(Math.ceil(res.length / 6));
      setIsLoading(false);
    });
  }, [selected, votedReviews]);

  function handleSelect(e) {
    setCurrentPageReviews(e.target.value);
    setSelected(e.target.value);
  }

  return (
    <main className="Reviews">
      <h1>REVIEWS</h1>

      <CategoryButtons
        url={url}
        changeUrl={changeUrl}
        categories={categories}
      />
      <select id="select" onChange={handleSelect} value={selected}>
        {createNestedArrays(reviews, pages).map((arr, index) => {
          return (
            <option value={index} key={index} id={index}>
              Page {index + 1}
            </option>
          );
        })}
      </select>
      <section className="reviewsContainer">
        {isLoading ? (
          <h1 className="loading">LOADING</h1>
        ) : (
          createNestedArrays(reviews, pages)[currentPageReviews].map(
            (review) => {
              return (
                <div
                  id={review.review_id}
                  key={review.review_id}
                  onMouseOver={changeUrl}
                  className="review">
                  <Link
                    to={url}
                    id={review.review_id}
                    key={review.review_id}
                    onMouseOver={changeUrl}
                    className="reviewLink">
                    <div
                      className="imgDiv"
                      id={review.review_id}
                      onMouseOver={changeUrl}>
                      <img
                        src={review.review_img_url}
                        alt={review.title}
                        id={review.review_id}
                        className="reviewImage"
                        onMouseOver={changeUrl}></img>
                    </div>
                  </Link>
                  <div id={review.review_id} onMouseOver={changeUrl}>
                    <h2
                      className="reviewTitle"
                      id={review.review_id}
                      onMouseOver={changeUrl}>
                      {review.title}
                    </h2>
                    <p id={review.review_id} onMouseOver={changeUrl}>
                      By {review.owner}
                    </p>
                    <p
                      id={review.review_id}
                      className={review.className}
                      onMouseOver={changeUrl}
                      onClickCapture={handleVoteClick}>
                      Votes: <span id="voteCount">{review.votes}</span>
                    </p>
                  </div>
                </div>
              );
            }
          )
        )}
      </section>
    </main>
  );
}
