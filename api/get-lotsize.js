import fetch from "node-fetch";

export default async function handler(req, res) {
  const { address } = req.body;
  res.status(200).json({ lotSize: 2200 });
}