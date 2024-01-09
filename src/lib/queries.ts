import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useKdramasData = () => {
  const fetchKdramas = () => {
    const res = axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/kdrama`);
    return res;
  };
  return useQuery(["kdrama"], fetchKdramas);
};

export { useKdramasData };
