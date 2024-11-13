import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { POST_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/types";

interface PostPageProps {
  post: Post;
}

export default function PostPage({ post }: PostPageProps) {
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
            alt={image.alt}
            width={500}
            height={300}
          />
        ))}
      </div>
    </div>
  );
}

// Pre-generate paths for all posts
export async function getStaticPaths() {
  const posts = await client.fetch(POSTS_QUERY);
  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug.current },
  }));
  return {
    paths,
    fallback: 'blocking', // Blocks until page is generated if not in paths
  };
}

// Fetch post data based on slug at build time or on-demand
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = await client.fetch(POST_QUERY, { slug: params.slug });
  return {
    props: {
      post,
    },
    revalidate: 10, // Revalidate every 10 seconds for fresh content
  };
}
