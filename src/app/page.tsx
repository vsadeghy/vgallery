import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { userId } = auth();
  const images = !userId
    ? []
    : await db.query.images.findMany({
        where: (image, { eq }) => eq(image.userId, userId),
        orderBy: (model, { desc }) => desc(model.id),
      });

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <div key={image.id} className="flex w-48 flex-col">
            <img src={image.url} alt={image.name} />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
