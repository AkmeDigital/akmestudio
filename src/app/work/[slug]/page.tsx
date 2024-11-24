// app/work/[slug]/page.tsx
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { POST_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/types";
import { notFound } from "next/navigation";
import HeaderText from "@/app/components/HeaderText";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage(props: PostPageProps) {
  const params = await props.params;
  const post: Post | null = await client.fetch(POST_QUERY, params);

  if (!post) {
    notFound(); // Handle 404 if post is not found
  }

  return (
    <div className="p-4">
      <HeaderText text={post.title} />

      <h1 className="text-3xl font-bold mb-8">{post.title}</h1>

      <div className="mb-8">
        {post.body?.map((block, index) => (
          <p key={index}>{block.children[0].text}</p>
        ))}
      </div>

      <div>
        {post.imageGallery?.map((image) => {
          const alignmentClass =
            image.position === "L"
              ? "text-left"
              : image.position === "R"
              ? "text-right"
              : "text-center";

          return (
            <div
              key={image._key}
              className={`w-full ${alignmentClass} mb-8 work-image-cont`} // Align based on position
            >
              <Image
                src={image.image.asset.url}
                alt={image.alt || "Gallery Image"}
                className="inline-block" // Inline block for alignment
                height={1800}
                width={1800}
                quality={100}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
