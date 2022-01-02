import { FC } from "react";
import { useParams } from "react-router-dom";

const Info: FC = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};

export default Info;
