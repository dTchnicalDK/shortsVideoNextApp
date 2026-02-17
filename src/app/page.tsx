import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import Link from "next/link";
import ShortsCard from "./components/shorts/shorts-card";

export default async function Home() {
  const user = await currentUser();
  // console.log("=====", user);
  if (!user) {
    return null;
  }
  const loggedInUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  });
  if (!loggedInUser) {
    await prisma.user.create({
      data: {
        name: user.fullName || "DummyName",
        email: user.emailAddresses[0].emailAddress,
        clerkUserId: user.id,
      },
    });
  }

  const allShortsOfUser = await prisma.shorts.findMany({
    where: { userId: loggedInUser?.id },
    include: { user: { select: { clerkUserId: true, email: true } } },
  });
  // console.log("shorts", AllShortsOfUser);
  if (user) {
    const { firstName, lastName, emailAddresses, id } = user;
    return (
      <div className="flex flex-col justify-between p-5 gap-5 snap-start">
        <div>
          firstName: {firstName} lastName: {lastName} email:{" "}
          {emailAddresses[0].emailAddress}
        </div>
        <div>
          <Link href="/create">
            <Button>
              <Plus /> CreateShort
            </Button>
          </Link>
        </div>

        {allShortsOfUser.length > 0 &&
          allShortsOfUser.map((short) => (
            <ShortsCard key={short.id} short={short} />
          ))}
      </div>
    );
  }
  return <div>Welcome home Guest! </div>;
}
