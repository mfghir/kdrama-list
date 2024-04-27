"use server";

import axios from "axios";

export const fetchQuotes = async () => {
  const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
    headers: {
      "X-Api-Key": process.env.NINJA_API_KEY,
    },
  });
  return response.data.map((quote: { quote: any }) => quote);
};

export const fetchFacts = async () => {
  const response = await axios.get("https://api.api-ninjas.com/v1/facts", {
    headers: {
      "X-Api-Key": process.env.NINJA_API_KEY,
    },
  });
  return response.data.map((fact: { fact: any }) => fact.fact);
};



export const generatePassword  = async () => {
  const response = await axios.get("https://api.api-ninjas.com/v1/passwordgenerator?length=8", {
    headers: {
      "X-Api-Key": process.env.NINJA_API_KEY,
    },
  });
  return response.data.map((password: { random_password: any; }) => password.random_password);
};
