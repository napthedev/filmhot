import { NextApiHandler } from "next";

import { getSearchKeywords } from "@/services/search";

const handler: NextApiHandler = async (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword || typeof keyword !== "string")
    return res.status(400).send("Invalid request");

  const data = await getSearchKeywords(keyword);

  res.send(data);
};

export default handler;
