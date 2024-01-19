import { useQuery } from "@tanstack/react-query";
import { MovieList } from "./schema";
// import axios from "axios";

const useKdramasData = () => {
  async function getKdramaList(): Promise<MovieList[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/kdrama`);
    const data = await res.json();
    return data;
  }

  return useQuery(["kdrama"], getKdramaList);
};

export { useKdramasData };
