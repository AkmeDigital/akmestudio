import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog')
    .items([
      // Main blog items
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),

      // Pages section
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.documentTypeListItem('home').title('home'),
            ])
        ),

      // Filter other document types not explicitly listed above
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author', 'home'].includes(item.getId()!)
      ),
    ]);
