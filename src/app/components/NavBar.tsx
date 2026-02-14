import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import React from "react";
import ModeToggle from "./ModeToggle";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import Link from "next/link";

const NavBar = async () => {
  const menus = ["home", "profile", "dashboard"];

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
              <Link
                href={`/${menu}`}
                key={key}
                className="cursor-pointer hover:text-slate-600 hover:underline  transition-all ease-in-out duration-300 capitalize"
              >
                <li>{menu}</li>
              </Link>
            ))}
          </ul>

          <ModeToggle />

          <div className="space-x-2 flex justify-between items-center my-3">
            {/* Show the sign-in and sign-up buttons when the user is signed out */}
            <SignedOut>
              <SignInButton>
                <Button variant="outline">SignIn</Button>
              </SignInButton>
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

export default NavBar;
