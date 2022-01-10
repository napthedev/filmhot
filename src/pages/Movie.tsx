import Error from "../components/Error";
import { FC } from "react";
import WatchView from "../components/WatchView";
import { getMovieDetail } from "../services/movie";
import { useParams } from "react-router-dom";
import useSWR from "swr";

const Info: FC = () => {
  const { id } = useParams();

  const { data, error } = useSWR(`movie-${id}`, () =>
    getMovieDetail(id as string)
  );

  if (error) return <Error />;

  return (
    <WatchView
      data={data?.data}
      sources={data?.sources}
      subtitles={data?.subtitles}
    />
  );
};

export default Info;
