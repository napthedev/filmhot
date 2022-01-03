import { Route, Routes } from "react-router-dom";

import { FC } from "react";
import Home from "./pages/Home";
import Movie from "./pages/Movie";

const App: FC = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="movie/:id">
        <Route index element={<Movie />} />
      </Route>
    </Routes>
  );
};

export default App;
