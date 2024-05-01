import User from "@/models/user";
import HomePage from "@/components/HomePage";


export default async function Home() {

  const users = await User.find().sort({ createdAt: -1 }) // Sort by date in descending order
  const usersList = users.map(user => user.toObject());


  return <HomePage usersList={JSON.parse(JSON.stringify(usersList))} />
}
