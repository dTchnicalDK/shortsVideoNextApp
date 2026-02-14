import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();
  // console.log("=====", user);
  if (user) {
    const { firstName, lastName, emailAddresses } = user;
    return (
      <div className="flex justify-between p-5 ">
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
      </div>
    );
  }
  return <div>Welcome home Guest! </div>;
}
