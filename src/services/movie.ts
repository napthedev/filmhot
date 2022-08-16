import { MovieDetail } from "@/types/movie";

import axios from "./client";

export const getMovieDetail = async (
  id: string,
  retryCount = 0
): Promise<{
  data: MovieDetail;
  sources: { quality: number; url: string }[];
  subtitles: { language: string; url: string; lang: string }[];
}> => {
  if (retryCount > 10) {
    throw new Error();
  }

  const data = (
    await axios.get("movieDrama/get", {
      params: {
        id,
        category: 0,
      },
    })
  ).data.data;

  const sources = (
    await Promise.all(
      data.episodeVo[0].definitionList.map(
        async (quality: any) =>
          (
            await axios.get("media/previewInfo", {
              params: {
                category: 0,
                contentId: id,
                episodeId: data.episodeVo[0].id,
                definition: quality.code,
              },
            })
          ).data.data.mediaUrl
      )
    )
  )
    .map((url, index) => ({
      quality: Number(
        data.episodeVo[0].definitionList[index].description
          .toLowerCase()
          .replace("p", "")
      ),
      url,
    }))
    .sort((a, b) => b.quality - a.quality);

  if (sources.some((item) => item.url.startsWith("http:"))) {
    return await getMovieDetail(id, retryCount + 1);
  }

  const subtitles = data.episodeVo[0].subtitlingList
    .map((sub: any) => ({
      language: `${sub.language}${sub.translateType ? " (Auto)" : ""}`,
      url: sub.subtitlingUrl,
      lang: sub.languageAbbr,
    }))
    .reduce((acc: any, element: any) => {
      if (element.lang === "en") {
        return [element, ...acc];
      }
      return [...acc, element];
    }, [])
    .reduce((acc: any, element: any) => {
      if (element.lang === "vi") {
        return [element, ...acc];
      }
      return [...acc, element];
    }, []);

  return {
    data,
    sources,
    subtitles,
  };
};
