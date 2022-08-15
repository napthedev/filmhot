import "../styles/globals.css";
import "react-tuby/css/main.css";
import "swiper/css";
import "swiper/css/navigation";

import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
  );
}

export default MyApp;
