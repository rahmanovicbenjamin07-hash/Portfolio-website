import { NAME, OG_IMAGE, SITE_URL } from './site'

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

      {/* Share cards: Open Graph (LinkedIn, Facebook, Slack, WhatsApp…); X reads og:title/description too */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {path !== undefined && <meta property="og:url" content={SITE_URL + path} />}
      <meta property="og:image" content={OG_IMAGE.url} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content={String(OG_IMAGE.width)} />
      <meta property="og:image:height" content={String(OG_IMAGE.height)} />
      <meta property="og:image:alt" content={OG_IMAGE.alt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={OG_IMAGE.url} />
      <meta name="twitter:image:alt" content={OG_IMAGE.alt} />
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      )}
    </>
  )
}
