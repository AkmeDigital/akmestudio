import HeaderText from '@/components/headerText';
import SecondaryFooter from '@/components/secondaryFooter';
import { client } from '@/sanity/lib/client';
import { ABOUT_QUERY } from '@/sanity/lib/queries';
import { AboutpageData } from '@/types/about';
import type { Metadata } from "next";
import Image from "next/image";


export const metadata: Metadata = {
  title: "Akmē Studio - About",
  description: "Akmē Studio is a multidisciplinary independent design studio based in Sydney, Australia."
};

export default async function AboutPage() {

  const aboutpageData: AboutpageData = await client.fetch(ABOUT_QUERY);

  return (
    <>
      <div className="lg:p-8 p-4 lg:mb-0 mb-12">
      <HeaderText text="contact@akmestudio.com" />
      <h1 className="hidden text-3xl font-bold mb-8">{aboutpageData.title}</h1>

      <div className="grid grid-cols-12 mb-8 lg:my-32">
        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <p>{aboutpageData.body}</p>
        </div>
      </div>
      <div className="grid grid-cols-12 mb-8">
      <div className='col-span-12 mb-8 lg:mb-48'>
        <Image
          src={aboutpageData.mainImage.asset.url}
          alt={aboutpageData.mainImage.alt || aboutpageData.title}
          className="w-full h-auto"
          quality={100}
          height={1800}
          width={1800}
          />
      </div>
      </div>
      <div className="grid grid-cols-12 mb-0 lg:mb-48">
        <div className='lg:col-span-7 col-span-4'>
          Services
        </div>
          {aboutpageData.sections.map((service, index) => (
            <div
            key={index}
            className={`lg:col-span-2 col-span-4 mb-8 ${(index === 0 || index === 2 || index === 4) ? 'lg:col-start-8' : 'lg:col-start-11'} ${(index === 2 || index === 4) ? 'col-start-5' : ''}`}
            >
              <h4 className="mb-4">{service.title}</h4>
              <ul className="">
          {service.items.map((item, index) => (
            <li key={index} className="">{item.name}</li>
          ))}
              </ul>
            </div>
          ))}
          </div>
        </div>

      <SecondaryFooter />
    </>
  )
}