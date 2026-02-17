"use client";
import { createShorts } from "@/actions/create-shorts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState, useState } from "react";

const CreateShort = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [formState, action, pending] = useActionState(createShorts, {
    errors: {},
  });

  console.log("formstate on client", formState);
  return (
    <div className="container flex justify-center items-center p-5 ">
      <form
        action={(formData: FormData) => {
          formData.append("video", videoUrl);
          action(formData);
        }}
        className="w-1/2 space-y-5"
      >
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
        <div className="space-y-2">
          <Label>Upload File</Label>
          <Input
            type="file"
            // name="video"
            className="cursor-pointer"
            onChange={() => {
              setVideoUrl("dummy videoUrl");
            }}
          />
          {formState.errors.video && (
            <p className="text-red-500 text-sm dark:text-red-300">
              {formState.errors.video}
            </p>
          )}
        </div>

        {formState.errors.formError && (
          <div className="p-4 bg-red-50 text-red-500 rounded-lg">
            <p>{formState.errors.formError}</p>{" "}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "sending..." : "Upload Video"}
        </Button>
      </form>
    </div>
  );
};

export default CreateShort;
