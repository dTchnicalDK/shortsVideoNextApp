import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React from "react";
import ModeToggle from "./ModeToggle";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const NavBar = async () => {
  const menus = ["Home", "Profile", "Dashboard"];
  const signInStatus = false;
  const session = await auth();
  console.log("session", session);
  return (
    <div className="min-w-screen border-b-2 shadow-lg flex justify-between items-center">
      <div className="left ">
        <h1 className="text-2xl font-serif font-bold px-5 py-3">
          D
          <span className="text-lime-500 dark:text-slate-400">shorTs</span>{" "}
        </h1>
      </div>

      <div className="center w-sm ">
        <Input type="search" placeholder="Search here..." />
      </div>

      <div className="right ">
        <div className="flex justify-between  items-center gap-5 px-3 ">
          <ul className="flex justify-center items-center gap-2 text-xl font-semibold">
            {menus.map((menu, key) => (
              <li
                key={key}
                className="cursor-pointer hover:text-slate-600 hover:underline  transition-all ease-in-out duration-300"
              >
                {menu}
              </li>
            ))}
          </ul>

          <ModeToggle />

          <div className="space-x-2 flex justify-between items-center my-3">
            {/* Show the sign-in and sign-up buttons when the user is signed out */}
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <Button>Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            {/* Show the user button when the user is signed in */}
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
};

const PopoverMenu = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>UserName here</PopoverTitle>
          <ul className="ml-3 text-lg font-semibold">
            <li>Profile settings</li>
            <li>Change password</li>
            <li>Profile settings</li>
          </ul>
        </PopoverHeader>
        <Separator className="my-3" />
        <div className="space-x-1 my-3">
          <Button>SignOut</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default NavBar;
