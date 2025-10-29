import fetch from "node-fetch";

export default async function handler(req, res) {
  const { address } = req.body;
  const ATTOM_KEY = process.env.ATTOM_KEY; // must match your environment variable name

  try {
    const response = await fetch(
      `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?address=${encodeURIComponent(address)}`,
      {
        headers: {
          'apikey': ATTOM_KEY,
          'Accept': 'application/json'
        }
      }
    );

    const data = await response.json();
    console.log("ATTOM raw response:", data); // for debugging

    const lotSize = data.property && data.property[0] ? data.property[0].lotSize : 2200;

    res.status(200).json({ lotSize });
  } catch (err) {
    console.error("ATTOM fetch error:", err);
    res.status(500).json({ lotSize: 2200 }); // fallback if error
  }
}
