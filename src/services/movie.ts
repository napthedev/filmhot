import { MovieInfo } from "@/types/movie";

import axios from "./client";

export const getMovieDetail = async (
  id: string,
  category: 0 | 1,
  episodeIndex = 0
): Promise<MovieInfo> => {
  const data = (
    await axios.get("movieDrama/get", {
      params: {
        id,
        category,
      },
    })
  ).data.data;

  const sources = (
    await Promise.all(
      data.episodeVo[episodeIndex].definitionList.map(
        async (quality: any) =>
          (
            await axios.get("media/previewInfo", {
              params: {
                category,
                contentId: id,
                episodeId: data.episodeVo[episodeIndex].id,
                definition: quality.code,
              },
            })
          ).data.data.mediaUrl
      )
    )
  )
    .map((url, index) => ({
      quality: Number(
        data.episodeVo[episodeIndex].definitionList[index].description
          .toLowerCase()
          .replace("p", "")
      ),
      url,
    }))
    .sort((a, b) => b.quality - a.quality);

  if (sources.some((item) => item.url.startsWith("http:"))) {
    return await getMovieDetail(id, category, episodeIndex);
  }

  const subtitles = data.episodeVo[episodeIndex].subtitlingList
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
    data: {
      ...data,
      // Info of all episode can be huge, up to 2MB
      episodeVo: data.episodeVo.length,
    },
    sources,
    subtitles,
  };
};
