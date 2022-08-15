import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";

import WatchView from "@/components/WatchView";
import { getMovieDetail } from "@/services/movie";

const MoviePage: NextPage<MoviePageProps> = ({ info }) => {
  return (
    <WatchView
      data={info?.data!}
      sources={info?.sources!}
      subtitles={info?.subtitles!}
    />
  );
};

export default MoviePage;

type MoviePageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const id = params?.id as string;

  if (!id || typeof id !== "string")
    return {
      notFound: true,
      props: {},
    };

  try {
    const info = await getMovieDetail(id);

    return {
      props: {
        info,
      },
      revalidate: 300,
    };
  } catch (e) {
    return {
      notFound: true,
      props: {},
      evaluate: 60,
    };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
