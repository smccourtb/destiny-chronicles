import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export const metadata = {
  title: "The Destiny Chronicles",
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) return <a href={"/api/auth/signin"}>Sign In</a>;

  const { user } = session;
  return (
    <>
      <a href={"/api/auth/signout"}>Sign Out</a>
      <p className={"text-2xl text-red-500"}>{user && `HI ${user.name}`}</p>
      <p className={"text-white text-lg font-[700]"}>THIS WEEK AT BUNGIE</p>
    </>
  );
}
