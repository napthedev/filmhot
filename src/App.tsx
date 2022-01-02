import { Route, Routes } from "react-router-dom";

import { FC } from "react";
import Home from "./pages/Home";
import MovieInfo from "./pages/Movie/Info";

const App: FC = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="movie/:id">
        <Route index element={<MovieInfo />} />
      </Route>
    </Routes>
  );
};

export default App;
