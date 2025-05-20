import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_API_TOKEN}`,
  },
};

const tmdb = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_API_TOKEN}`,
  },
  options,
});

const getMovies = async (category, pageNumber = 1) => {
  const response = await tmdb.get(
    `/${category ? category : "now_playing"}?language=en-US&page=${pageNumber}`
  );
  return response.data;
};

const getSingleMovie = async (id) => {
  const response = await tmdb.get(`/${id}/videos?language=en-US`);
  return response.data;
};

export { getMovies, getSingleMovie };
