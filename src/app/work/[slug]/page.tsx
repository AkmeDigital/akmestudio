import type { Metadata } from "next";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { POST_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/types";
import { notFound } from "next/navigation";
import HeaderText from "@/components/headerText";
import SecondaryFooter from "../../../components/secondaryFooter";

async function getPost(slug: string) {
  const res = await client.fetch(POST_QUERY, { slug }, {cache: 'force-cache'})
  const post: Post = await res
  if (!post) notFound()
    return post

}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  console.log('params', params)
  const post = await getPost(params.slug);
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

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPost(params.slug); 

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="p-8">
        <HeaderText text={post.title} />

        <h1 className=" text-3xl hidden font-bold mb-8">{post.title}</h1>

        <div className="grid grid-cols-12 my-32 ">
          <div className="lg:col-span-4 col-span-12">
            {post.body?.map((block, index) => (
              <p key={index}>{block.children[0].text}</p>
            ))}
          </div>
        </div>
        
        {post?.imageGallery && 
          <div className='col-span-12 mb-8 lg:mb-48'>
            {post.imageGallery[0].image?.asset.url &&
              <Image
                src={post.imageGallery[0].image?.asset.url }
                alt={post.imageGallery[0].alt || post.title}
                className="w-full h-auto"
                quality={100}
                height={1800}
                width={1800}
                />
            }
          </div>
        }

        <div className="grid grid-cols-12 ">
          {post.imageGallery?.slice(1).map((image, index) => {
            const alignmentClass =
              image.position === "L"
                ? "col-start-1 col-span-10"
                : image.position === "R"
                ? "col-start-3 col-span-10 ml-auto"
                : "col-start-2 col-span-10";

            return (
              <div key={image._key} className={`${index === 0 ? 'col-span-12' : alignmentClass} mb-8 lg:mb-48 work-image-cont`}>
                { image.image && 
                  <Image
                    src={image.image.asset.url}
                    alt={image.alt || "Gallery Image"}
                    className="w-full h-auto "
                    quality={100}
                    height={1800}
                    width={1800}
                  />
                }
                {image.video && (
                  <video
                    className="w-full h-auto"
                    controls
                    src={image.video.asset.url}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <SecondaryFooter />
    </>
  );
}