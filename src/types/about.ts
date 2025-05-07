// src/types/aboutpage.ts

export interface AboutpageData {
  title: string;
  mainImage: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  body: string;
  sections: {
    title: string;
    items: {
      name: string;
    }[];
  }[];
}
