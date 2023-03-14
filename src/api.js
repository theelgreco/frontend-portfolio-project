import axios from "axios";

export const fetchReviews = () => {
  return axios
    .get("https://nc-games-ki7a.onrender.com/api/reviews")
    .then((res) => {
      return res.data.reviews;
    })
    .catch((err) => {
      console.error(err);
    });
};
