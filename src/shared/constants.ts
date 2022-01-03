export const resizeImage = (url: string, width = "", height = "") =>
  `https://agvmolqooq.cloudimg.io/v7/${url}?width=${width}&height=${height}`;

export const subtitleProxy = (url: string) =>
  `https://srt-to-vtt.vercel.app?url=${encodeURIComponent(url)}`;

export const SIDEBAR_LINKS = [
  {
    title: "Menu",
    children: [
      {
        name: "Home",
        link: "/",
        icon: "home",
      },
      {
        name: "Discovery",
        link: "/discovery",
        icon: "compass",
      },
      {
        name: "Explore",
        link: "/explore",
        icon: "desktop",
      },
    ],
  },

  {
    title: "General",
    children: [
      {
        name: "Settings",
        link: "/settings",
        icon: "cog",
      },
      {
        auth: true,
        name: "Auth",
      },
    ],
  },
];
