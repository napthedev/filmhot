import { useRouter } from "next/router";
import { FC, useEffect } from "react";

interface NavigateProps {
  to: string;
}

const Navigate: FC<NavigateProps> = ({ to }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [router, to]);

  return <></>;
};

export default Navigate;
