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
  const post = await getPost(params.slug);
  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.subTitle || "No description available",
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
      <div className="p-4 lg:p-8 post">
        <HeaderText text={post.title} />

        <h1 className=" text-3xl hidden font-bold mb-8">{post.title}</h1>

        <div className="grid grid-cols-12 lg:my-32 my-12">
          {post.subTitle && (
            <div className="lg:col-span-5 col-span-12 lg:mb-0 mb-8">
              <h3 className="subtitle lg:text-5xl lg:leading-[3.2rem] text-4xl leading-[2.4rem]">{post.subTitle}</h3>
            </div>
          )}
          <div className="lg:col-span-5 lg:col-start-8 col-span-12">
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
          {post.imageGallery?.slice(1).map((image) => {
            const alignmentClass =
              image.position === "L"
                ? "col-start-1 col-span-10"
                : image.position === "R"
                ? "col-start-3 col-span-10 ml-auto"
                : "col-start-2 col-span-10";
            return (
              <div key={image._key} className={`${alignmentClass} mb-8 lg:mb-48 work-image-cont`}>
                { image?.image?.asset?.url && 
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
                    loop
                    autoPlay      
                    muted                      
                    src={image.video.asset.url}
                    className="w-full h-auto"
                    controls
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen"
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