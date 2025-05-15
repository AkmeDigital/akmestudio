// src/app/page.tsx (Home page - remains a server component)
import { client } from '@/sanity/lib/client';
import { HOMEPAGE_QUERY } from '@/sanity/lib/queries';
import { HomepageData } from '@/types/homepage';
import HeaderText from '@/components/headerText';
import ImageSlider from '@/components/imageSlider'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Akmē Studio",
  description: "Akmē Studio is a multidisciplinary independent design studio based in Sydney, Australia."
};

export default async function Home() {
  const homepageData: HomepageData = await client.fetch(HOMEPAGE_QUERY);

  return (
    <div className="home w-full bg-black bg-center">
      <HeaderText text="Multidisciplinary independent design studio based in Sydney, Australia." /> {/* Set header text */}
      <ImageSlider images={homepageData.imageGallery} mobileImages={homepageData.mobileImageGallery} />
    </div>
  );
}
