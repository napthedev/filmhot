export const resizeImage = (url: string, width = "", height = "") =>
  `https://images.weserv.nl/?url=${encodeURIComponent(
    url
  )}&w=${width}&h=${height}&fit=outside`;

export const subtitleProxy = (url: string) =>
  `https://srt-to-vtt.vercel.app?url=${encodeURIComponent(url)}`;

export const IMAGE_CARD_SIZE = {
  0: {
    width: 200,
    height: 100,
  },
  1: {
    width: 175,
    height: 246,
  },
};
