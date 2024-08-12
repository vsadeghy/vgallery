import { auth } from "@clerk/nextjs/server";
import {
  experimental_taintObjectReference,
  experimental_taintUniqueValue,
} from "react";
import "server-only";
import { db } from "~/server/db";

export async function getMyImages() {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (image, { eq }) => eq(image.userId, userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  experimental_taintObjectReference(
    "do not pass user data to the client",
    images.user,
  );
  experimental_taintUniqueValue(
    "do not pass user's password to the client",
    images.user.password,
  );
}
