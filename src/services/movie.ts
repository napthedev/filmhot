import { DetailType } from "../shared/types";
import axios from "../shared/axios";

export const getMovieDetail = async (
  id: string
): Promise<{
  data: DetailType;
  sources: { quality: number; url: string }[];
  subtitles: { language: string; url: string; lang: string }[];
}> => {
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
