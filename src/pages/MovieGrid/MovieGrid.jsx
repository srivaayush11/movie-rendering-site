// components/MovieGrid.js
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./MovieGrid.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { getMovies } from "../../services/services";

const MovieGrid = () => {
  const { title } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const pageNumber = useRef(1);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category } = location.state;

  const observer = useRef(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const moviesData = await getMovies(category, pageNumber.current);
    setApiData((prev) => [...prev, ...moviesData.results]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const lastElementObserver = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        pageNumber.current += 1;
        fetchData();
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <div className="movie_list_container">
      <div className="movie_category_title">
        <img src={back_arrow_icon} alt="" onClick={() => navigate(-1)} />
        <span>{title}</span>
      </div>
      <div className="movie-grid">
        {apiData.map((movie, index) => (
          <div
            key={index}
            className="movie-card"
            ref={index === apiData.length - 1 ? lastElementObserver : null}
          >
            <Link to={`/player/${movie.id}`}>
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <p>{movie.overview.slice(0, 100)}...</p>
            </Link>
          </div>
        ))}
      </div>
      {loading && <p>loading</p>}
    </div>
  );
};

export default MovieGrid;
