// ./src/sanity/lib/queries.ts

export const POSTS_QUERY = `*[_type == "post"]{
  _id,
  title,
  slug,
  mainImage {
    alt,
    asset-> {
      url
    }
  }
}`;

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  mainImage {
    alt,
    asset-> {
      url
    }
  },
  body,
  imageGallery[] {
    alt,
    position,
    _key,
    image {
      asset-> {
        url
      }
    }
  }
}`;

export const HOMEPAGE_QUERY = `*[_type == "home"][0]{
  title,
  imageGallery[]{
    asset->{
      url
    },
    alt
  }
}`;

export const ABOUT_QUERY = `*[_type == "about"][0]{
  title,
  mainImage {
    asset->{
      url
    },
    alt
  },
  body,
  sections[] {
    title,
    items[] {
      name
    }
  }
}`;