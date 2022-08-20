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

export const resizeImage = (
  url: string,
  width: number | string = "",
  height: number | string = ""
) =>
  `https://images.weserv.nl/?url=${encodeURIComponent(
    url
  )}&w=${width}&h=${height}&fit=cover&output=webp`;
