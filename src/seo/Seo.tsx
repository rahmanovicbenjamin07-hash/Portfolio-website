import { SITE_URL } from './site'

type Props = {
  title: string
  description: string
  /** Canonical path, e.g. "/". Leave out on pages that must not be indexed. */
  path?: string
  noindex?: boolean
  jsonLd?: object
}

// React 19 hoists <title>, <meta> and <link> into <head>. At build time scripts/prerender.mjs
// writes them into each page's static HTML, and hydration reuses those tags.
export default function Seo({ title, description, path, noindex, jsonLd }: Props) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {path !== undefined && <link rel="canonical" href={SITE_URL + path} />}
      {noindex && <meta name="robots" content="noindex" />}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      )}
    </>
  )
}
