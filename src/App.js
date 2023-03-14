import "./App.css";
import Reviews from "./Components/Reviews.jsx";
import Header from "./Components/Header.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </div>
  );
}

export default App;
