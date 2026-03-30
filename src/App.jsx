import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withLazyLoading from "./hocs";
import ProtectedRoute from "./services/ProtectedRoute";
import AuthProvider from "./contexts/AuthProvider";

function App() {
  const Home = withLazyLoading(() => import("./pages/Home/Home"));
  const Login = withLazyLoading(() => import("./pages/Login/Login"));
  const Player = withLazyLoading(() => import("./pages/Player/Player"));
  const MovieGrid = withLazyLoading(
    () => import("./pages/MovieGrid/MovieGrid"),
  );

  return (
    <div>
      <ToastContainer theme="dark" />
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/player/:id/:category"
            element={
              <ProtectedRoute>
                <Player />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/movie/:title"
            element={
              <ProtectedRoute>
                <MovieGrid />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
