"use client";
import { createShorts } from "@/actions/create-shorts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState, useState } from "react";
import Upload from "../components/Upload";
// import Upload from "../components/Upload";

const CreateShort = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [formState, action, pending] = useActionState(createShorts, {
    errors: {},
  });

  console.log("formstate on client", formState);
  return (
    <div className="container flex justify-center items-center p-5 py-8">
      <form
        action={(formData: FormData) => {
          formData.append("video", videoUrl);
          action(formData);
        }}
        className="w-3/4 max-w-lg md:h-1/2  space-y-5"
      >
        <h1 className="text-center font-semibold text-xl font-mono">
          Upload Your Shorts Here!{" "}
        </h1>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input type="text" name="title" />
          {formState.errors.title && (
            <p className="text-red-500 text-sm dark:text-red-300">
              {formState.errors.title}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Input type="text" name="description" />
          {formState.errors.description && (
            <p className="text-red-500 text-sm dark:text-red-300">
              {formState.errors.description}
            </p>
          )}
        </div>

        <Upload setVideoUrl={setVideoUrl} />

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "sending..." : "Upload Video"}
        </Button>
      </form>
    </div>
  );
};

export default CreateShort;
