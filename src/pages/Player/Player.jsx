import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleMovie } from "../../services/movieServices";
import ReactPlayer from "react-player";

function Player() {
  const [movieData, setMovieData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const { id, category } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      const singleMovie = await getSingleMovie(id, category);
      setMovieData(singleMovie);
    })();
  }, [id, category]);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={() => navigate(-1)} />
      <ReactPlayer
        url={`https://www.youtube.com/embed/${movieData.key}`}
        controls={true}
        width="90%"
        height="90%"
      />
      <div className="player-info">
        <p>{movieData.published_at.slice(0, 10)}</p>
        <p>{movieData.name}</p>
        <p>{movieData.type}</p>
      </div>
    </div>
  );
}

export default Player;
