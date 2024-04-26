"use server";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export async function getQuotes() {
  try {
    const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
      headers: { "X-Api-Key": process.env.NINJA_API_KEY },
    });
    const quotes = response.data;
    console.log(quotes);
    return quotes;
  } catch (error: any) {
    console.error("Error:", error.response.data);
  }
}

export async function getFacts() {
  try {
    const response = await axios.get("https://api.api-ninjas.com/v1/facts", {
      headers: { "X-Api-Key": process.env.NINJA_API_KEY },
    });
    const facts = response.data;
    console.log(facts);
    return facts;
  } catch (error: any) {
    console.error("Error:", error.response.data);
  }
}





// import { useQuery } from 'react-query';

export function useQuotes() {
  return useQuery(['quotes'], getQuotes);
}

export function useFacts() {
  return useQuery(['facts'], getFacts);
}