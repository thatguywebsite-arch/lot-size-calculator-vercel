import fetch from "node-fetch";

export default async function handler(req, res) {
  // 1️⃣ Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // 2️⃣ Get address from frontend
  const { address } = req.body;
  const ATTOM_KEY = process.env.ATTOM_KEY; // make sure you added your ATTOM key in Vercel environment variables

  try {
    const response = await fetch(
      `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?address=${encodeURIComponent(address)}`,
      {
        headers: {
          apikey: ATTOM_KEY,
          Accept: "application/json"
        }
      }
    );

    const data = await response.json();
    console.log("ATTOM raw response:", data);

    const lotSize =
      data.property && data.property[0] && data.property[0].lotSize
        ? data.property[0].lotSize
        : 2200; // fallback if no data

    res.status(200).json({ lotSize });
  } catch (err) {
    console.error("ATTOM fetch error:", err);
    res.status(500).json({ lotSize: 2200 });
  }
}
