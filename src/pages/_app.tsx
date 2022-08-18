import "../styles/globals.css";
import "react-tuby/css/main.css";
import "swiper/css";
import "swiper/css/navigation";
import "react-lazy-load-image-component/src/effects/opacity.css";

import { withTRPC } from "@trpc/next";
import { useSetAtom } from "jotai";
import type { AppProps } from "next/app";
import Script from "next/script";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import superjson from "superjson";

import { AppRouter } from "@/server/createRouter";
import { userAtom } from "@/store";
import { supabase } from "@/utils/supabase";

function MyApp({ Component, pageProps }: AppProps) {
  const setUser = useSetAtom(userAtom);
  useEffect(() => {
    setUser(supabase.auth.user());
    supabase.auth.onAuthStateChange(() => setUser(supabase.auth.user()));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NextNProgress color="#0D90F3" options={{ showSpinner: false }} />
      <Component {...pageProps} />
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            strategy="lazyOnload"
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          ></Script>
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}
          </Script>
        </>
      )}
    </>
  );
}

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.browser) return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config() {
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
    };
  },
})(MyApp);
