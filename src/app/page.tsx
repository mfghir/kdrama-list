
import KdramaList from "@/components/KdramaList";
import { Toaster } from "@/components/ui/toaster";
import { MovieList } from "@/lib/schema";

// import { columns } from "@/utilities/table/columns";
// import { useKdramasData } from "@/lib/queries";
// import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";


// export async function getKdramaList(): Promise<MovieList[]> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/kdrama`)
//   const data = await res.json()
//   return data
// }



export default async function Home() {

  // const data = await getKdramaList()
  // const queryClient = new QueryClient()

  return (
    <main>
      {/* <HydrationBoundary state={dehydrate(queryClient)} > */}
        {/* <KdramaList data={data} columns={columns} /> */}
        {/* <KdramaList columns={columns} /> */}
        <KdramaList  />
        <Toaster />
      {/* </HydrationBoundary> */}
    </main>
  )
}
