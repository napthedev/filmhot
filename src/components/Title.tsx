import { FC, useEffect } from "react";

interface TitleProps {
  value: string;
}

const Title: FC<TitleProps> = ({ value }) => {
  useEffect(() => {
    document.title = value;
  }, [value]);
  return <></>;
};

export default Title;
