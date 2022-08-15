import axios from "axios";
import { NextApiHandler } from "next";
// @ts-ignore
import { convert } from "subtitle-converter";

const handler: NextApiHandler = async (req, res) => {
  try {
    const url = req.query.url;

    if (!url || typeof url !== "string")
      return res.status(400).send("Invalid request");

    const response = await axios.get(encodeURI(url));

    if (
      !response.headers["content-type"].startsWith("application/x-subrip") &&
      !response.headers["content-type"].includes("srt")
    )
      return res.status(400).send("Invalid content type");

    const { subtitle } = convert(response.data, ".vtt");

    if (!subtitle) return res.status(400).send("Cannot convert");

    res.setHeader("content-type", "text/vtt");

    res.send(subtitle);
  } catch (error) {
    if (!res.headersSent)
      res.status(500).send("Failed to convert the subtitle");
  }
};

export default handler;
