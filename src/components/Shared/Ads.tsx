import { FC, useEffect } from "react";

const Ads: FC = () => {
  useEffect(() => {
    // @ts-ignore
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <>
      {process.env.NEXT_PUBLIC_CA_PUB && (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_CA_PUB}`}
          data-ad-slot="3294380897"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      )}
    </>
  );
};

export default Ads;
