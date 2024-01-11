import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MovieList } from "./schema";

const useKdramasData = () => {
  // const fetchKdramas = () => {
  //   const res = axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/kdrama`);
  //   return res;
  // };


  async function getKdramaList(): Promise<MovieList[]> {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/kdrama`)
      const data = await res.json()
      return data
    }

  return useQuery(["kdrama"], getKdramaList);
};

export { useKdramasData };

// export async function getKdramaList(): Promise<MovieList[]> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/kdrama`)
//   const data = await res.json()
//   return data
// }