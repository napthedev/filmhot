import { NextApiHandler } from "next";

import { getHome } from "@/services/home";

const handler: NextApiHandler = async (req, res) => {
  const page = req.query.page;

  if (Number.isNaN(page)) return res.status(400).send("Invalid request");

  const data = await getHome(Number(page));

  res.send(data);
};

export default handler;
