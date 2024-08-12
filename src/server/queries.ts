import { auth } from "@clerk/nextjs/server";
import "server-only";
import { db } from "~/server/db";

export async function getMyImages() {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  return await db.query.images.findMany({
    where: (image, { eq }) => eq(image.userId, userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
}
