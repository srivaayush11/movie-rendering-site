import { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import "./MovieSearch.css";

export default function MovieSearch({ allMovies, category }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );

    setResults(filtered);
  }, [debouncedQuery, allMovies]);

  return (
    <div
      style={{
        maxWidth: "500px",
        position: "relative",
      }}
    >
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: "0.5rem" }}
      />

      {results.length > 0 && (
        <div className="search-result">
          <ul>
            {results.map((movie) => (
              <li
                key={movie.id}
                onClick={() => navigate(`/player/${movie.id}/${category}`)}
              >
                {movie.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
