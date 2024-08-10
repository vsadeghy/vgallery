import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://uploadkon.ir/uploads/d68210_2415b22216-ed78-4d19-91d6-bca006902996.jpg",
  "https://uploadkon.ir/uploads/2ee710_24d20477a9-32b7-4a33-8786-80c45ad83833.png",
  "https://uploadkon.ir/uploads/94a210_24d0780894-8406-47b1-a224-822f0901c308.png",
  "https://uploadkon.ir/uploads/9aee10_24abc96c60-af40-4323-ab66-2ff700b64c6f.jpg",
];

const mockImages = mockUrls.map((url, idx) => ({
  id: idx + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log({ posts });

  return (
    <main className="">
      {posts.map((post) => (
        <div key={post.id}>
          {post.name}
          <br />
        </div>
      ))}
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image, i) => (
          <div key={`${image.id}-${i}`} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
