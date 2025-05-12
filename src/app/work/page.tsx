
import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/types"; 
// import SecondaryFooter from "../../components/secondaryFooter";
import HeaderText from "../../components/headerText";


export const metadata: Metadata = {
  title: "Akme - Work",
  description: "Akmē Studio is a multidisciplinary independent design studio based in Sydney, Australia."
};

export default async function WorkPage() {
  const posts: Post[] = await client.fetch(POSTS_QUERY);

  console.log("posts", posts[0].priority);

  return (
    <>
      <div className="p-8 lg:mt-16">
        <HeaderText text="Multidisciplinary independent design studio based in Sydney, Australia." /> {/* Set header text */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <Link
              href={`/work/${post.slug.current}`}
              key={post._id}
              className="group relative block overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                {post.mainImage && post.mainImage.asset && (
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.mainImage.alt || post.title}
                    className="mb-32"
                    width={500}
                    height={300}
                  />
                )}
                <div className="absolute inset-0 bg-[var(--background-color)] bg-opacity-100 opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-center justify-center text-white">
                  {post.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
  
}
