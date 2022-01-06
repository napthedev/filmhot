export const formatVideoTime = (time: number) => {
  const date = new Date(0);
  date.setSeconds(time);
  const timeString = date.toISOString().substr(11, 8);
  return timeString;
};

export const isMobile = () =>
  /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

export const htmlToText = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent;
};
