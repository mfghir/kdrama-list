
import KdramaList from "@/components/KdramaList";
import { Toaster } from "@/components/ui/toaster";


export default async function Home() {

  return (
    <>
      <KdramaList />
      <Toaster />
    </>
  )
}
