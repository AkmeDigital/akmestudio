// app/work/[slug]/page.tsx
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { POST_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/types";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  // Pass `params` directly into the fetch function
  const post: Post | null = await client.fetch(POST_QUERY, params);

  if (!post) {
    notFound(); // Handle 404 if post is not found
  }

  return (
    <div>
      <h1>{post.title}</h1>
      {post.mainImage && post.mainImage.asset && (
        <Image
          src={post.mainImage.asset.url}
          alt={post.mainImage.alt || post.title}
          width={800}
          height={500}
        />
      )}
      <div>
        {post.body?.map((block, index) => (
          <p key={index}>{block.children[0].text}</p>
        ))}
      </div>
      <div>
        {post.imageGallery?.map((image) => (
          <Image
            key={image._key}
            src={image.image.asset.url}
            alt={image.alt || 'Gallery Image'}
            width={500}
            height={300}
          />
        ))}
      </div>
    </div>
  );
}
