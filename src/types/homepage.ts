// src/types/homepage.ts

export interface GalleryImage {
  asset: {
    url: string;
  };
  alt?: string;
}

export interface HomepageData {
  title: string;
  imageGallery: GalleryImage[];
}
