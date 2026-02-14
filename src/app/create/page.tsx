import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const CreateShort = () => {
  return (
    <div className="container flex justify-center items-center p-5 ">
      <form action="" className="w-1/2 space-y-5">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input type="text" name="title" />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Input type="text" name="descrition" />
        </div>
        <div className="space-y-2">
          <Label>Upload File</Label>
          <Input type="file" name="video" className="cursor-pointer" />
        </div>
        <Button type="submit" className="w-full">
          Upload Video
        </Button>
      </form>
    </div>
  );
};

export default CreateShort;
