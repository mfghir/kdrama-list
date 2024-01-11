import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useAddDrama = () => {
  const addDrama = (data:unknown) => {
    return axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/kdrama`, data);
  };

  return useMutation(addDrama);
};


const useEditDrama = () => {
  const editDrama = (id: any,data: any) => {
    return axios.patch(`${process.env.NEXT_PUBLIC_API_KEY}/kdrama/${id}`, data);
  };

  return useMutation({editDrama});
};


export { useAddDrama ,useEditDrama};

