"use server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const uploadShortsSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(6),
  video: z.string(),
});

type UploadShortsState = {
  errors: {
    title?: string[];
    description?: string[];
    video?: string[];
    formError?: string[];
  };
};
const createShorts = async (formData: FormData) => {
  const parsedFormData = uploadShortsSchema.safeParse({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    video: formData.get("video") as string,
  });
  if (!parsedFormData.success) {
    return { error: parsedFormData.error.flatten().fieldErrors };
  }

  //checking is userLogged in or not
  const { userId } = await auth();
  console.log("userid", userId);
  if (!userId) {
    return {
      error: { formError: ["please login first! "] },
    };
  }
  console.log("working...");
};
