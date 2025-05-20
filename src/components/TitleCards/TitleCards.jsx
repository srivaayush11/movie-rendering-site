import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import "./TitleCards.css";
import { getMovies } from "../../services/services.js";
import { Link, useNavigate } from "react-router-dom";
import { ContentContext } from "../../contexts/ContentContext.jsx";
import back_arrow_icon from "../../assets/back_arrow_icon.png";

function TitleCards({ title, category }) {
  const { content } = useContext(ContentContext);
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);

  const handleWheel = (event) => {
    cardsRef.current.scrollLeft += event.deltaX;
  };

  useEffect(() => {
    (async function () {
      const moviesData = await getMovies(category);
      setApiData(moviesData.results);
      if (cardsRef.current) {
        cardsRef.current.addEventListener("wheel", handleWheel);
      }
    })();
  }, [category]);

  const movieContentList = useMemo(() => {
    const filterBy = content === "adult";
    return apiData.filter((movie) => movie.adult === filterBy) ?? [];
  }, [apiData, content]);
  return (
    <div className="title-cards">
      <h2
        onClick={() =>
          navigate(`/movie/${title ? title : "Popular on Netflix"}`, {
            state: { category },
          })
        }
      >
        {title ? title : "Popular on Netflix"}
      </h2>

      <div className="card-list" ref={cardsRef}>
        {movieContentList.length > 0
          ? movieContentList.map((card, index) => (
              <Link to={`/player/${card.id}`} className="card" key={index}>
                <img
                  src={`https://image.tmdb.org/t/p/w500` + card.poster_path}
                  alt=""
                  loading="lazy"
                />
                <p>{card.original_title}</p>
              </Link>
            ))
          : `No movie for selected content ${content}`}
        {movieContentList.length && (
          <div className="see-more">
            <span>{"Explore more"}</span>
            <img
              src={back_arrow_icon}
              alt=""
              onClick={() =>
                navigate(`/movie/${title ? title : "Popular on Netflix"}`, {
                  state: { category },
                })
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TitleCards;
