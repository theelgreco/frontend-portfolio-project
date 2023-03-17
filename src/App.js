import "./App.css";
import Reviews from "./Components/Reviews.jsx";
import Header from "./Components/Header.jsx";
import Categories from "./Components/Categories.jsx";
import { Routes, Route } from "react-router-dom";
import SingleReview from "./Components/SingleReview";
import { useState } from "react";
import { patchVotes, fetchCategories } from "./utils/api";
import { useEffect } from "react";

function App() {
  const [currentPageReviews, setCurrentPageReviews] = useState(0);
  const [currentPageCategories, setCurrentPageCategories] = useState(0);
  const [selected, setSelected] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState(0);
  const [votedReviews, setVotedReviews] = useState({});
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [url, setUrl] = useState("");
  const [categories, setCategories] = useState([]);

  function handleVoteClick(e) {
    let review_id;
    let votes;
    let voteTarget;
    let voteCountToPatch;

    if (e.target.id === "voteCount") {
      voteTarget = e.target;
    } else {
      voteTarget = e.target.children[0];
    }

    votes = Number(voteTarget.innerText);
    review_id = voteTarget.parentElement.id;

    if (checkIfVoted(review_id, votedReviews)) {
      voteCountToPatch = -1;
      voteTarget.innerText = votes - 1;
      voteTarget.parentElement.className = "votes";
      setVotedReviews({ ...votedReviews, [review_id]: false });
    } else {
      voteCountToPatch = 1;
      voteTarget.innerText = votes + 1;
      voteTarget.parentElement.className = "votes voted";
      setVotedReviews({ ...votedReviews, [review_id]: true });
    }

    patchVotes(review_id, voteCountToPatch).catch((err) => {
      voteTarget.innerText = votes;
      voteTarget.parentElement.className = "votes error";
      setVotedReviews({ ...votedReviews, [review_id]: false });
      console.error(err);
    });
  }

  useEffect(() => {
    fetchCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  function checkIfVoted(id, votedObj) {
    let isVoted = false;
    for (let vote in votedObj) {
      if (votedObj[id]) {
        isVoted = true;
      }
    }
    return isVoted;
  }

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

  function changeUrl(e) {
    if (parseInt(e.target.id)) {
      setUrl(`/reviews/${e.target.id}`);
    } else {
      setUrl(`/categories/${e.target.id}`);
    }
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Reviews
              currentPageReviews={currentPageReviews}
              setCurrentPageReviews={setCurrentPageReviews}
              selected={selected}
              setSelected={setSelected}
              votedReviews={votedReviews}
              handleVoteClick={handleVoteClick}
              sortBy={sortBy}
              order={order}
              setOrder={setOrder}
              setSortBy={setSortBy}
              createNestedArrays={createNestedArrays}
              changeUrl={changeUrl}
              url={url}
              setUrl={setUrl}
              categories={categories}
              setCategories={selectedCategories}
            />
          }
        />
        <Route
          path="/categories/:category"
          element={
            <Categories
              currentPageCategories={currentPageCategories}
              setCurrentPageCategories={setCurrentPageCategories}
              votedReviews={votedReviews}
              handleVoteClick={handleVoteClick}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              createNestedArrays={createNestedArrays}
              changeUrl={changeUrl}
              url={url}
              setUrl={setUrl}
              categories={categories}
              selected={selected}
              sortBy={sortBy}
              order={order}
              setOrder={setOrder}
              setSortBy={setSortBy}
            />
          }
        />
        <Route
          path="/reviews/:review_id"
          element={
            <SingleReview
              votedReviews={votedReviews}
              handleVoteClick={handleVoteClick}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
