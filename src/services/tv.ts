import { DetailType } from "../shared/types";
import axios from "../shared/axios";

export const getTVDetail = async (
  id: string,
  episodeIndex: number
): Promise<{
  data: DetailType;
  sources: { quality: number; url: string }[];
  subtitles: { language: string; url: string; lang: string }[];
}> => {
  const data = (
    await axios.get("movieDrama/get", {
      params: {
        id,
        category: 1,
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
                category: 1,
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
    data,
    sources,
    subtitles,
  };
};
