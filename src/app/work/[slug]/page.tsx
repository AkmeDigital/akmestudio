import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { POST_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/types";
import { notFound } from "next/navigation";
import HeaderText from "@/components/headerText";
import SecondaryFooter from "../../../components/secondaryFooter";

// Cache the fetch call so it doesn't run twice
// const getPost = cache(async (slug: string): Promise<Post | null> => {
//   return await client.fetch(POST_QUERY, { slug });
// });

async function getPost(slug: string) {
  const res = await client.fetch(POST_QUERY, { slug }, {cache: 'force-cache'})
  const post: Post = await res
  if (!post) notFound()
    // console.log('***', post)
    return post

}

export async function generateMetadata(
  { params }: { params: { slug: string } }, // ✅ Corrected type and key name
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params.slug); // ✅ No async destructuring issue

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  return {
    title: post.title,
    description: "A detailed view of the post.",
  };
}

// ✅ Fix PostPage function
export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug); // ✅ Pass only the slug

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
                ? "col-start-3 col-span-10 ml-auto"
                : "col-start-2 col-span-10";

            return (
              <div key={image._key} className={`${alignmentClass} mb-8 work-image-cont`}>
                <Image
                  src={image.image.asset.url}
                  alt={image.alt || "Gallery Image"}
                  className="w-full h-auto"
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