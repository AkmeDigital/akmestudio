// app/work/[slug]/page.tsx
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { POST_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/types";
import { notFound } from "next/navigation";
import HeaderText from "@/app/components/headerText";
import SecondaryFooter from "@/app/components/secondaryFooter";

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
    <>
      <div className="p-4">
        <HeaderText text={post.title} />

        <h1 className="text-3xl font-bold mb-8">{post.title}</h1>

        <div className="mb-8">
          {post.body?.map((block, index) => (
            <p key={index}>{block.children[0].text}</p>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-4">
          {post.imageGallery?.map((image) => {
            const alignmentClass =
              image.position === "L"
                ? "col-start-1 col-span-10"
                : image.position === "R"
                ? "col-start-3 col-span-10 ml-auto" // Align right with `ml-auto`
                : "col-start-2 col-span-10";

            return (
              <div
                key={image._key}
                className={`${alignmentClass} mb-8 work-image-cont`} // Align based on position
              >
                <Image
                  src={image.image.asset.url}
                  alt={image.alt || "Gallery Image"}
                  className="w-full h-auto" // Ensure responsive images
                  quality={100}
                  height={1800}
                  width={1800}
                />
              </div>
            );
          })}
        </div>
      </div>
      <SecondaryFooter />
    </>
  );
}
