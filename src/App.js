import "./App.css";
import Reviews from "./Components/Reviews.jsx";
import Header from "./Components/Header.jsx";
import { Routes, Route } from "react-router-dom";
import SingleReview from "./Components/SingleReview";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Reviews />} />
        <Route path="/:review_id" element={<SingleReview />}></Route>
      </Routes>
    </div>
  );
}

export default App;
