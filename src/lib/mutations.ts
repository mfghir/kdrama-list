import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useAddDrama = () => {
  const addDrama = (data: unknown) => {
    return axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/kdrama`, data);
  };

  return useMutation(addDrama);
};

const useEditDrama = () => {
  const queryClient = useQueryClient();
  const editDrama = (item: any) => {
    return axios.put(
      `${process.env.NEXT_PUBLIC_API_KEY}/kdrama/${item.id}`,
      item
    );
  };

  return useMutation(editDrama, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["kdrama"]);
    },
  });
};

const useDeleteDrama = () => {
  const queryClient = useQueryClient();
  const deleteDrama = (item: any) => {
    return axios.delete(`${process.env.NEXT_PUBLIC_API_KEY}/kdrama/${item.id}`);
  };

  return useMutation(deleteDrama, {
    onSuccess: (deletedItemId) => {
      queryClient.setQueryData(["kdrama"], (oldItems:any) => {
        return oldItems.filter((item:any) => item.id !== deletedItemId);
      });
    },
  });
};

export { useAddDrama, useEditDrama,useDeleteDrama };
