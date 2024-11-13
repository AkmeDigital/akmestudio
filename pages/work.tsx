import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/types"; 

interface WorkProps {
  posts: Post[];
}

export default function Work({ posts }: WorkProps) {
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

export async function getStaticProps() {
  const posts = await client.fetch(POSTS_QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}
