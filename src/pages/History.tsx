import { FC, useState } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import { resizeImage } from "../shared/constants";

const getHistory = () => {
  try {
    const existing = JSON.parse(localStorage.getItem("filmhot-recent") || "[]");
    return existing;
  } catch {
    return [];
  }
};

const History: FC = () => {
  const [data, setData] = useState(getHistory());

  const clearHistory = () => {
    localStorage.removeItem("filmhot-recent");
    setData(getHistory());
  };

  return (
    <>
      <Title value="Watch history - FilmHot" />
      <div className="flex flex-col items-stretch mx-[7vw] mb-8">
        <NavBar />
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl">Watch history</h1>

          <button onClick={clearHistory} className="text-primary">
            <i className="fas fa-trash"></i> <span>Clear</span>
          </button>
        </div>
        {data.length === 0 ? (
          <div className="flex flex-col items-center my-10 gap-6">
            <img className="w-40 h-40 object-cover" src="/cinema.svg" alt="" />

            <p className="text-xl">No Watch history found</p>

            <Link className="text-xl text-primary" to="/">
              Discover more
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-sm md:grid-cols-lg">
            {data.map((item) => (
              <Link
                title={item.name}
                to={
                  item.category === 0 ? `/movie/${item.id}` : `/tv/${item.id}`
                }
                key={item.id}
                className="relative h-0 pb-[163%] bg-dark-lighten rounded overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-stretch">
                  <div className="relative w-full h-0 pb-[140%] flex-shrink-0 group-hover:brightness-[80%] transition duration-300">
                    <LazyLoadImage
                      effect="opacity"
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      src={resizeImage(item.coverVerticalUrl, "250")}
                      alt=""
                    />
                  </div>

                  <div className="flex-grow flex items-center">
                    <h1 className="w-full whitespace-nowrap overflow-hidden text-ellipsis px-2 group-hover:text-primary transition duration-300">
                      {item.name}
                    </h1>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default History;
