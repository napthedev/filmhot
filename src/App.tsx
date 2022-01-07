import { Route, Routes } from "react-router-dom";

import Explore from "./pages/Explore";
import { FC } from "react";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Search from "./pages/Search";
import TV from "./pages/TV";

const App: FC = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="movie/:id" element={<Movie />} />
      <Route path="tv/:id" element={<TV />} />
      <Route path="search" element={<Search />} />
      <Route path="explore" element={<Explore />} />
    </Routes>
  );
};

export default App;
