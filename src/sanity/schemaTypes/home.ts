import { defineType } from 'sanity';

export const home = defineType({
  name: 'home', 
  title: 'Home',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'imageGallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              options: { isHighlighted: true },
            },
          ],
        },
      ],
    },
    {
      name: 'mobileImageGallery',
      title: 'Mobile Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              options: { isHighlighted: true },
            },
          ],
        },
      ],
    },
  ],
});
