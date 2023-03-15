import "./App.css";
import Reviews from "./Components/Reviews.jsx";
import Header from "./Components/Header.jsx";
import { Routes, Route } from "react-router-dom";
import SingleReview from "./Components/SingleReview";
import { useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selected, setSelected] = useState(0);
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
            />
          }
        />
        <Route path="/:review_id" element={<SingleReview />}></Route>
      </Routes>
    </div>
  );
}

export default App;
