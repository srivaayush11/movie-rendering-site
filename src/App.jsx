import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withLazyLoading from "./hocs/WithLazyLoading";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  }, []);

  const Home = withLazyLoading(() => import("./pages/Home/Home"));
  const Login = withLazyLoading(() => import("./pages/Login/Login"));
  const Player = withLazyLoading(() => import("./pages/Player/Player"));
  const MovieGrid = withLazyLoading(() =>
    import("./pages/MovieGrid/MovieGrid")
  );

  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/player/:id" element={<Player />}></Route>
        <Route path="/movie/:title" element={<MovieGrid />}></Route>
      </Routes>
    </div>
  );
}

export default App;
