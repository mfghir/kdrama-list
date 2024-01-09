import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useAddUser = () => {
  const addUser = (data:unknown) => {
    return axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/kdrama`, data);
  };

  return useMutation(addUser);
};


export { useAddUser };

