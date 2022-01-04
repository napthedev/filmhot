import { FC } from "react";
import MobilePlayer from "../components/MobilePlayer";
import Player from "../components/Player";
import { getMovieDetail } from "../services/movie";
import { isMobile } from "../shared/utils";
import { useParams } from "react-router-dom";
import useSWR from "swr";

const Info: FC = () => {
  const { id } = useParams();

  const { data, error } = useSWR(`movie-${id}`, () =>
    getMovieDetail(id as string)
  );

  if (!data || error) return <h1>Loading</h1>;

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="max-w-[800px] w-full">
        {isMobile() ? (
          <MobilePlayer sources={data.sources} subtitles={data.subtitles} />
        ) : (
          <Player sources={data.sources} subtitles={data.subtitles} />
        )}
      </div>
    </div>
  );
};

export default Info;
