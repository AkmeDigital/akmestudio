import Image from "next/image";
import {client} from '@/sanity/lib/client'
import {POSTS_QUERY} from '@/sanity/lib/queries'
import {POST_QUERY} from '@/sanity/lib/queries'

export default async function Home() {
  const posts = await client.fetch(POSTS_QUERY)

  console.log(posts)


  const post = await client.fetch(POSTS_QUERY[0])

  console.log('--', post[0], '--')
  console.log('title', post[0]?.title)
  console.log('title', post[0]?.imageGallery)

  // next step, figure out slugs and sub pages auto generating. 

  return (
   <div>
    <h1>hello</h1>

   </div>
  );
}
