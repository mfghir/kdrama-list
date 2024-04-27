// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";

// const useAddDrama = () => {
//   const queryClient = useQueryClient();

//   const addDrama = (data: unknown) => {
//     return axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/kdrama`, data);
//   };

//   return useMutation(addDrama, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["kdrama"]); // Refresh the "kdrama" query
//     },
//   });
// };

// const useEditDrama = () => {
//   const queryClient = useQueryClient();
//   const editDrama = (item: any) => {
//     return axios.put(
//       `${process.env.NEXT_PUBLIC_API_KEY}/kdrama/${item.id}`,
//       item
//     );
//   };

//   return useMutation(editDrama, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["kdrama"]); // Refresh the "kdrama" query
//     },
//   });
// };

// const useDeleteDrama = () => {
//   const queryClient = useQueryClient();
//   const deleteDrama = (item: any) => {
//     return axios.delete(`${process.env.NEXT_PUBLIC_API_KEY}/kdrama/${item.id}`);
//   };

//   return useMutation(deleteDrama, {
//     onSuccess: (deletedItemId) => {
//       queryClient.setQueryData(["kdrama"], (oldItems: any) => {
//         return oldItems.filter((item: any) => item.id !== deletedItemId);
//       });
//       queryClient.invalidateQueries(["kdrama"]); // Refresh the "kdrama" query
//     },

//     // onSuccess: async () => {
//     //   await queryClient.invalidateQueries(["kdrama"]);
//     // },
//   });
// };

// export { useAddDrama, useEditDrama, useDeleteDrama };

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { MovieList } from "./data";

const useAddDrama = () => {
  const queryClient = useQueryClient();

  const addDrama = async (data: unknown) => {
    // await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/kdrama`, data);
    await axios.post("/api/kdrama", data);

    console.log("data - useAddDrama ---->", data);
  };

  return useMutation(addDrama, {
    onSettled: () => {
      queryClient.invalidateQueries(["kdrama"]);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["kdrama"]); // Refresh the "kdrama" query
    },
  });
};

const useEditDrama = () => {
  const queryClient = useQueryClient();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const editDrama = async (item: any) => {
    await axios.put(
      // `${process.env.NEXT_PUBLIC_API_KEY}/kdrama/`,
      `/api/kdrama/${item.id}`,
      item
    );
  };

  return useMutation(editDrama, {
    onSuccess: () => {
      queryClient.invalidateQueries(["kdrama"]); // Refresh the "kdrama" query
    },
  });
};

const useDeleteDrama = () => {
  const queryClient = useQueryClient();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const deleteDrama = async (item: any) => {
    // await axios.delete(`${process.env.NEXT_PUBLIC_API_KEY}/kdrama/${item.id}`);
    await axios.delete(`/api/kdrama/${item.id}`);
    return item.id;
  };

  return useMutation(deleteDrama, {
    onSuccess: (deletedItemId) => {
      queryClient.setQueryData<MovieList[] | undefined>(
        ["kdrama"],
        (oldItems) => {
          if (oldItems) {
            return oldItems.filter((item) => item.id !== deletedItemId);
          }
          return [];
        }
      );
      queryClient.invalidateQueries(["kdrama"]);
    },
  });
};

export { useAddDrama, useEditDrama, useDeleteDrama };
