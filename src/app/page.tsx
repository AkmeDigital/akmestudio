// src/app/page.tsx (Home page - remains a server component)
import { client } from '@/sanity/lib/client';
import { HOMEPAGE_QUERY } from '@/sanity/lib/queries';
import { HomepageData } from '@/types/homepage';
import HeaderText from '@/components/headerText';
import ImageSlider from '@/components/imageSlider'


export default async function Home() {
  const homepageData: HomepageData = await client.fetch(HOMEPAGE_QUERY);

  console.log(homepageData.imageGallery)

  return (
    <div className="home w-full bg-black bg-center">
      <HeaderText text="My Homepage" /> {/* Set header text */}
      <ImageSlider images={homepageData.imageGallery} />
    </div>
  );
}
