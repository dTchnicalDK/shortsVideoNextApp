import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React from "react";
import ModeToggle from "./ModeToggle";

const NavBar = () => {
  const menus = ["Home", "Profile", "Dashboard"];
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
        <div className="flex justify-between  gap-5 px-3 ">
          <ul className="flex justify-center items-center gap-2 text-xl font-semibold">
            {menus.map((menu, key) => (
              <li key={key}>{menu}</li>
            ))}
          </ul>
          <ModeToggle />
          <div className="space-x-1">
            <Button>SignIn</Button>
            <Button>SignOut</Button>
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
