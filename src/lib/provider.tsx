"use client"

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient =  new QueryClient()

export default function Provider({ children }: { children: ReactNode }) {
  // const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}


// "use client"
// import React, { useState } from "react"
// import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

// export default function Provider({ children }: any) {
//   const [client] = useState(new QueryClient())

//   return (
//     <>
//       <QueryClientProvider client={client}>
//         {/* <ReactQueryStreamedHydration> */}
//             {children}
//         {/* </ReactQueryStreamedHydration> */}
//         <ReactQueryDevtools initialIsOpen={false} />
//       </QueryClientProvider>
//     </>
//   )
// }
