import "../styles/globals.css";
import "react-tuby/css/main.css";
import "swiper/css";
import "swiper/css/navigation";

import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="#0D90F3" options={{ showSpinner: false }} />
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          revalidateOnMount: false,
          revalidateOnReconnect: false,
          revalidateIfStale: false,
          refreshInterval: 0,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}

export default MyApp;
