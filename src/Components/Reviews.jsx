import { useState, useEffect } from "react";
import { fetchReviews } from "../utils/api";
import { Link } from "react-router-dom";

export default function Reviews({
  currentPage,
  setCurrentPage,
  selected,
  setSelected,
  votedReviews,
  handleVoteClick,
}) {
  const [reviews, setReviews] = useState([]);
  const [pages, setPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [deleteClicked, setDeleteClicked] = useState(false);

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
  }, [selected]);

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
    setSelected(e.target.value);
  }

  function changeUrl(e) {
    setUrl(`/${e.target.id}`);
  }

  function handleDelete(e) {
    const reviewIdToDelete = e.target.parentNode.id;
    console.dir(reviewIdToDelete);
    setDeleteClicked(true);
  }

  return (
    <main className="Reviews">
      <h1>REVIEWS</h1>
      {deleteClicked ? <div className="users"></div> : <></>}
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
          createNestedArrays(reviews, pages)[currentPage].map((review) => {
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
                  onClickCapture={changeUrl}
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
                  <div className="delete" onClick={handleDelete}></div>
                </div>
              </div>
            );
          })
        )}
      </section>
    </main>
  );
}
