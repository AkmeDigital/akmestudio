import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/types"; 

export default async function WorkPage() {
  const posts: Post[] = await client.fetch(POSTS_QUERY);

  return (
    <div>
      <h1>Work Page</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link href={`/work/${post.slug.current}`}>
              <h2>{post.title}</h2>
              {post.mainImage && post.mainImage.asset && (
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.mainImage.alt || post.title}
                  width={500}
                  height={300}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
