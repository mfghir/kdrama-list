import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useAddDrama = () => {
  const addDrama = (data:unknown) => {
    return axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/kdrama`, data);
  };

  return useMutation(addDrama);
};


const useEditDrama = () => {
  
  const queryClient = useQueryClient()
  const editDrama = (item:any) => {
    return axios.put(`${process.env.NEXT_PUBLIC_API_KEY}/kdrama/${item.id}`, item);
  };

  return  useMutation(editDrama, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["kdrama"]);
    
    },
  });

  

  // return useMutation({
  //   mutationFn: editDrama,
  //   // When mutate is called:
  //   onMutate: async (newTodo) => {
  //     // Cancel any outgoing refetches
  //     // (so they don't overwrite our optimistic update)
  //     await queryClient.cancelQueries({ queryKey: ['kdrama', newTodo.id] })
  
  //     // Snapshot the previous value
  //     const previousTodo = queryClient.getQueryData(['kdrama', newTodo.id])
  
  //     // Optimistically update to the new value
  //     queryClient.setQueryData(['kdrama', newTodo.id], newTodo)
  
  //     // Return a context with the previous and new todo
  //     return { previousTodo, newTodo }
  //   },
  //   // If the mutation fails, use the context we returned above
  //   onError: (err, newTodo, context) => {
  //     queryClient.setQueryData(
  //       ['todos', context.newTodo.id],
  //       context.previousTodo,
  //     )
  //   },
  //   // Always refetch after error or success:
  //   onSettled: (newTodo) => {
  //     queryClient.invalidateQueries({ queryKey: ['kdrama', newTodo.id] })
  //   },
  // })
};


export { useAddDrama ,useEditDrama};

