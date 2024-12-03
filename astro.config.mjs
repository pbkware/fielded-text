// @ts-check
// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // make sure has trailing slash
  base: '/fielded-text/',

  trailingSlash: 'always',
  integrations: [mdx()],

  redirects: {
    '/c-sharp-library/examples/basic_example_meta_file.html': '/c-sharp-library/examples/csharp-basic-example-meta-file/',
    '/c-sharp-library/examples/basicread_metaloaded.html': '/c-sharp-library/examples/csharp-basic-reading-of-csv-file-with-loaded-meta/',
    '/c-sharp-library/examples/basicread_metagen.html': '/c-sharp-library/examples/csharp-basic-reading-of-csv-file-with-meta-generated-programmatically/',
    '/c-sharp-library/examples/basicwrite.html': '/c-sharp-library/examples/csharp-basic-writing-of-csv-file/',
    '/c-sharp-library/examples/build_meta_with_sequences.html': '/c-sharp-library/examples/csharp-build-meta-for-csv-file-with-sequences/',
    '/c-sharp-library/examples/countingrecords.html': '/c-sharp-library/examples/csharp-counting-of-records-in-a-csv-file/',
    '/c-sharp-library/examples/mixed_fixed_delimited.html': '/c-sharp-library/examples/csharp-file-with-fixed-width-and-delimited-fields/',
    '/c-sharp-library/examples/read_sequence_using_ordinals.html': '/c-sharp-library/examples/csharp-reading-csv-file-with-sequences-using-ordinals/',
    '/c-sharp-library/examples/read_sequence.html': '/c-sharp-library/examples/csharp-reading-csv-file-with-sequences/',
    '/c-sharp-library/examples/read_events.html': '/c-sharp-library/examples/csharp-reading-of-csv-file-using-events/',
    '/c-sharp-library/examples/write_sequence_using_events.html': '/c-sharp-library/examples/csharp-writing-csv-file-with-sequences-using-events/',
    '/c-sharp-library/examples/write_sequence.html': '/c-sharp-library/examples/csharp-writing-csv-file-with-sequences/',
    '/c-sharp-library/examples/write_declared.html': '/c-sharp-library/examples/csharp-writing-of-a-declared-fielded-text-file/',
    '/c-sharp-library/examples/write_headings.html': '/c-sharp-library/examples/csharp-writing-of-csv-file-including-headings/',
    '/c-sharp-library/examples/write_events.html': '/c-sharp-library/examples/csharp-writing-of-csv-file-using-events/',
    '/c-sharp-library/examples/write_comments.html': '/c-sharp-library/examples/csharp-writing-of-csv-file-with-comments/',
    '/delphi-library/examples/basicread.html': '/delphi-library/examples/delphi-basic-reading-of-csv-file/',
    '/delphi-library/examples/basicwrite.html': '/delphi-library/examples/delphi-basic-writing-of-csv-file/',
  },

  // Set the vite scss api property below if the following warning is displayed:
  // Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' // or "modern"
        }
      }
    },
    assetsInclude: ['**/*.ftm'],
  }
});