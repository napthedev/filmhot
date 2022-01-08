import { FC } from "react";
import MovieGrid from "../MovieGrid";
import { advanceSearch } from "../../services/explore";
import useSWR from "swr";

interface ExploreResultProps {
  params: string;
  configs: {
    [key: string]: any;
  };
}

const ExploreResult: FC<ExploreResultProps> = ({ params, configs }) => {
  const { data, error } = useSWR(
    `explore-${params}-${JSON.stringify(configs)}`,
    () => advanceSearch(params, configs)
  );

  if (error) return <div>Error</div>;

  return <MovieGrid data={data} />;
};

export default ExploreResult;
