import { currentUser } from "@clerk/nextjs/server";
import FeedScroller from "../components/feed/FeedScroller";
import { prisma } from "@/lib/prisma";

export default async function FeedPage() {
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
  //   console.log("shorts", allShortsOfUser);
  return (
    <main className="h-screen w-full bg-black text-white overflow-hidden">
      <FeedScroller shorts={allShortsOfUser} />
    </main>
  );
}
