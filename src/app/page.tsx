import KdramaList from "@/components/KdramaList";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-200 lg:p-20 ">
      test
      <LoginForm />
      <KdramaList />
    </main>
  )
}
