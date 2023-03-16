import "./App.css";
import Reviews from "./Components/Reviews.jsx";
import Header from "./Components/Header.jsx";
import { Routes, Route } from "react-router-dom";
import SingleReview from "./Components/SingleReview";
import { useState } from "react";
import { patchVotes } from "./api";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selected, setSelected] = useState(0);
  const [votedReviews, setVotedReviews] = useState({});
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");

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

  function checkIfVoted(id, votedObj) {
    let isVoted = false;
    for (let vote in votedObj) {
      if (votedObj[id]) {
        isVoted = true;
      }
    }
    return isVoted;
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Reviews
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              selected={selected}
              setSelected={setSelected}
              votedReviews={votedReviews}
              handleVoteClick={handleVoteClick}
              sortBy={sortBy}
              order={order}
              setOrder={setOrder}
              setSortBy={setSortBy}
            />
          }
        />
        <Route
          path="/:review_id"
          element={
            <SingleReview
              votedReviews={votedReviews}
              handleVoteClick={handleVoteClick}
            />
          }></Route>
      </Routes>
    </div>
  );
}

export default App;
