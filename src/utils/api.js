import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://nc-games-ki7a.onrender.com/api",
});

export const fetchReviews = () => {
  return gamesApi
    .get("/reviews")
    .then((res) => {
      return res.data.reviews;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const fetchReviewById = (id) => {
  return gamesApi
    .get(`/reviews/${id}`)
    .then((res) => {
      return res.data.review;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const fetchComments = (id) => {
  return gamesApi.get(`/reviews/${id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const fetchUsers = () => {
  return gamesApi.get("/users").then((res) => {
    return res.data.users;
  });
};
