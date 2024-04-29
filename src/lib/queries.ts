import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { MovieList } from "./data";

const useKdramasData = () => {
  // async function getKdramaList(): Promise<MovieList[]> {
  async function getKdramaList(): Promise<MovieList[]> {
    // const res = await fetch(`/api/kdrama`);
    // const data = await res.json();
    // console.log(data);

    const res = await axios.get("/api/kdrama");
    // console.log(res);
    return res.data.data;
  }

  return useQuery(["kdrama"], getKdramaList);
};

export { useKdramasData };

// import { MovieList } from "./schema";

// const useKdramasData = () => {
//   async function getKdramaList(): Promise<MovieList[]> {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/kdrama`);
//     const data = await res.json();
//     return data.data;
//   }

//   return useQuery(["kdrama"], getKdramaList);
// };

// export { useKdramasData };
