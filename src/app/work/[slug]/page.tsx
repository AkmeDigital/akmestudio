// app/work/[slug]/page.tsx
"use client"; // Make this a client component

import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { POST_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/types";
import { useHeaderContext } from "@/app/context/HeaderContext";

interface PostPageProps {
  params: { slug: string };
}

export default function PostPage({ params }: PostPageProps) {
  const { setHeaderText } = useHeaderContext(); // Access context to update header text
  const [post, setPost] = useState<Post | null>(null); // State to store post data

  // Fetch data on the client side
  useEffect(() => {
    async function fetchData() {
      const fetchedPost: Post | null = await client.fetch(POST_QUERY, { slug: params.slug });
      setPost(fetchedPost);
      
      if (fetchedPost) {
        setHeaderText(fetchedPost.title); // Set header text to the post title
      }
    }
    
    fetchData();
  }, [params.slug, setHeaderText]);

  if (!post) {
    return <div>Loading...</div>; // Show a loading state while fetching
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
            alt={image.alt || "Gallery Image"}
            width={500}
            height={300}
          />
        ))}
      </div>
    </div>
  );
}
