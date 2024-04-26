"use server";

import axios from "axios";

export async function getQuotes() {
  try {
    const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
      headers: { "X-Api-Key": process.env.NINJA_API_KEY },
    });
    const quotes = response.data;
    console.log(quotes);
    // res.status(200).json(quotes);
    return quotes;
  } catch (error: any) {
    console.error("Error:", error.response.data);
    // res.status(500).json({ message: "Failed to fetch facts" });
  }
}
