import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useAddUser = () => {
  const addUser = (data:unknown) => {
    return axios.post("https://652e19eff9afa8ef4b280a1d.mockapi.io/list/kdrama", data);
  };

  return useMutation(addUser);
};


export { useAddUser };

