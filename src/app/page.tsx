// src/app/page.tsx
import { client } from '@/sanity/lib/client';
import { HOMEPAGE_QUERY } from '@/sanity/lib/queries';
import { HomepageData } from '@/types/homepage';
import ImageSlider from './components/ImageSlider';

export default async function Home() {
  const homepageData: HomepageData = await client.fetch(HOMEPAGE_QUERY);

  return (
    <div className="home w-full h-screen bg-black bg-center">
      <ImageSlider images={homepageData.imageGallery} />
    </div>
  );
}
