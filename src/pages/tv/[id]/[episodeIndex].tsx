import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";

import Meta from "@/components/Shared/Meta";
import WatchView from "@/components/WatchView";
import { getMovieDetail } from "@/services/movie";

const TVPage: NextPage<TVPageProps> = ({ info }) => {
  const router = useRouter();

  return (
    <>
      <Meta
        title={`Watch ${info?.data.name} - Episode ${
          Number(router.query.episodeIndex) + 1
        } - Filmhot`}
        description="FilmHot - AdFree Movie / Anime Watching Website"
        image={info?.data.coverHorizontalUrl || "/preview.png"}
      />
      <WatchView
        data={info?.data!}
        sources={info?.sources!}
        subtitles={info?.subtitles!}
        episodeIndex={Number(router.query.episodeIndex)}
      />
    </>
  );
};

export default TVPage;

type TVPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const id = params?.id as string;
  const episodeIndex = params?.episodeIndex as string;

  if (
    !id ||
    typeof id !== "string" ||
    !episodeIndex ||
    Number.isNaN(episodeIndex)
  )
    return {
      notFound: true,
      props: {},
    };

  try {
    const info = await getMovieDetail(id, 1, +episodeIndex);

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
