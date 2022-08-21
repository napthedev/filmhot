import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";

import Meta from "@/components/Shared/Meta";
import WatchView from "@/components/WatchView";
import { getMovieDetail } from "@/services/movie";

const MoviePage: NextPage<MoviePageProps> = ({ info }) => {
  return (
    <>
      <Meta
        title={`Watch ${info?.data.name} - Filmhot`}
        description="FilmHot - AdFree Movie / Anime Watching Website"
        image={info?.data.coverHorizontalUrl || "/preview.png"}
      />
      <WatchView
        data={info?.data!}
        sources={info?.sources!}
        subtitles={info?.subtitles!}
      />
    </>
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
    const info = await getMovieDetail(id, 0);

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
      revalidate: 300,
    };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
