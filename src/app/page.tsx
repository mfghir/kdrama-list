import KdramaList from "@/components/KdramaList";
import { Toaster } from "@/components/ui/toaster";
import { MovieList } from "@/lib/schema";

import { columns } from "@/utilities/table/columns";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";


export async function getKdramaList(): Promise<MovieList[]> {
  const res = await fetch('https://652e19eff9afa8ef4b280a1d.mockapi.io/list/kdrama')
  const data = await res.json()
  return data
}



export default async function Home() {

  const data = await getKdramaList()
  const queryClient = new QueryClient()

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)} >
        <KdramaList data={data} columns={columns} />
        <Toaster />
      </HydrationBoundary>
    </main>
  )
}
