"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const uploadShortsSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(6),
  video: z.string(),
});

type UploadShortsState = {
  errors: {
    title?: string[] | undefined;
    description?: string[];
    video?: string[];
    formError?: string[];
  };
};
export const createShorts = async (
  previousState: UploadShortsState,
  formData: FormData,
): Promise<UploadShortsState> => {
  // pasing form data if its valid data
  const parsedFormData = uploadShortsSchema.safeParse({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    video: formData.get("video") as string,
  });
  console.log("parsedFormData", parsedFormData);
  if (!parsedFormData.success) {
    return { errors: parsedFormData.error.flatten().fieldErrors };
  }

  //checking is userLogged in or not
  const { userId } = await auth();
  console.log("userid", userId);
  if (!userId) {
    return {
      errors: { formError: ["please login first! "] },
    };
  }
  console.log("working...good to go further...");

  const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
  try {
    if (!user?.id) {
      return { errors: { formError: ["user not found"] } };
    }
    //creating data in database
    await prisma.shorts.create({
      data: {
        title: parsedFormData.data.title,
        description: parsedFormData.data.description,
        url: parsedFormData.data.video,
        userId: user.id,
      },
    });
    // return { errors: {} };
  } catch (error) {
    if (error instanceof Error) {
      return { errors: { formError: [error.message] } };
    } else {
      return {
        errors: { formError: ["Internal server error try again!"] },
      };
    }
  }

  revalidatePath("/");
  redirect("/");
};
