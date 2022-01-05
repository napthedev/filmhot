import { useLocation, useParams } from "react-router-dom";

import { FC } from "react";
import WatchView from "../components/WatchView";
import { getTVDetail } from "../services/tv";
import useSWR from "swr";

const TV: FC = () => {
  const { id } = useParams();

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const episodeIndex = Number(queryParams.get("episode")) || 0;

  const { data, error } = useSWR(`tv-${id}-${episodeIndex}`, () =>
    getTVDetail(id as string, episodeIndex)
  );

  if (error) return <h1>Error</h1>;

  return (
    <WatchView
      data={data?.data}
      sources={data?.sources}
      subtitles={data?.subtitles}
      episodeIndex={episodeIndex}
    />
  );
};

export default TV;
