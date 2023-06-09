import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../utils/api";
import { Link } from "react-router-dom";
import Header from "./Header";

export default function Categories({
  currentPageCategories,
  setCurrentPageCategories,
  votedReviews,
  handleVoteClick,
  createNestedArrays,
  url,
  changeUrl,
  setSelectedCategories,
  selected,
  categories,
  sortBy,
  order,
  setOrder,
  setSortBy,
}) {
  const { category } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetchReviews(category, sortBy, order).then((res) => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sortBy, order]);

  function handleSelect(e) {
    if (e.target.id === "sortBy") {
      setSortBy(e.target.value);
    } else if (e.target.id === "order") {
      setOrder(e.target.value);
    } else {
      setCurrentPageCategories(e.target.value);
      setSelectedCategories(e.target.value);
    }
  }

  return (
    <main>
      <Header
        createNestedArrays={createNestedArrays}
        reviews={reviews}
        pages={pages}
        handleSelect={handleSelect}
        selected={selected}
        sortBy={sortBy}
        order={order}
        url={url}
        changeUrl={changeUrl}
        categories={categories}
        category={category}
      />

      <h1>{category}</h1>
      <section className="reviewsContainer">
        {isLoading ? (
          <h1 className="loading">LOADING</h1>
        ) : (
          createNestedArrays(reviews, pages)[currentPageCategories].map(
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
                    <p>
                      {new Date(review.created_at).toLocaleDateString("en-gb", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
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
