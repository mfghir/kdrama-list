// "use server";

import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_NINJA_API_KEY;

export const fetchQuotes = async () => {
  const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
    headers: {
      "X-Api-Key": "7dK5WLtwDyExnmGrGyrIyg==CxiwhXya1srNi0AF",
    },
  });
  // console.log("fetchQuotes -----",response.data[0])
  return response.data[0];
};

export const fetchFacts = async () => {
  const response = await axios.get("https://api.api-ninjas.com/v1/facts", {
    headers: {
      // "X-Api-Key": API_KEY,
      "X-Api-Key": "7dK5WLtwDyExnmGrGyrIyg==CxiwhXya1srNi0AF",
    },
  });
  // console.log("fetchFacts -----",response.data[0])

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return response.data.map((fact: { fact: any }) => fact.fact);
};

export const fetchSuggestion = async () => {
  const response = await axios.get("https://api.api-ninjas.com/v1/bucketlist", {
    headers: {
      // "X-Api-Key": API_KEY,
      "X-Api-Key": "7dK5WLtwDyExnmGrGyrIyg==CxiwhXya1srNi0AF",
    },
  });
  // console.log("fetchSuggestion -----",response.data[0])

  return response.data.item;
};

export const fetchJokes = async () => {
  const response = await axios.get("https://api.api-ninjas.com/v1/jokes", {
    headers: {
      // "X-Api-Key": API_KEY,
      "X-Api-Key": "7dK5WLtwDyExnmGrGyrIyg==CxiwhXya1srNi0AF",
    },
  });
  console.log("fetchJokes -----", response.data[0]);

  return response.data[0];
};


export const generatePassword = async () => {
  const response = await axios.get(
    "https://api.api-ninjas.com/v1/passwordgenerator?length=8",
    {
      headers: {
        // "X-Api-Key": process.env.NEXT_PUBLIC_NINJA_API_KEY,
        "X-Api-Key": "7dK5WLtwDyExnmGrGyrIyg==CxiwhXya1srNi0AF",
      },
    }
  );
  console.log(response.data);
  // return response.data.map((password: { random_password: any; }) => password.random_password);
  return response.data.random_password;
};
