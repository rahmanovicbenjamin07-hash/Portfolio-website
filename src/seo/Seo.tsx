import { NAME, OG_IMAGE, SITE_URL } from './site'

type Props = {
  title: string
  description: string
  /** Share-card title and description (Open Graph and X). Default to title and description. */
  ogTitle?: string
  ogDescription?: string
  /** Canonical path, e.g. "/". Leave out on pages that must not be indexed. */
  path?: string
  noindex?: boolean
}

// React 19 hoists <title>, <meta> and <link> into <head>. At build time scripts/prerender.mjs
// writes them into each page's static HTML, and hydration reuses those tags.
export default function Seo({ title, description, ogTitle = title, ogDescription = description, path, noindex }: Props) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {path !== undefined && <link rel="canonical" href={SITE_URL + path} />}
      <meta name="robots" content={noindex ? 'noindex' : 'index, follow, max-image-preview:large'} />

      {/* Share cards: Open Graph (LinkedIn, Facebook, Slack, WhatsApp…) and X */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={NAME} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      {path !== undefined && <meta property="og:url" content={SITE_URL + path} />}
      <meta property="og:image" content={OG_IMAGE.url} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content={String(OG_IMAGE.width)} />
      <meta property="og:image:height" content={String(OG_IMAGE.height)} />
      <meta property="og:image:alt" content={OG_IMAGE.alt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={OG_IMAGE.url} />
      <meta name="twitter:image:alt" content={OG_IMAGE.alt} />
    </>
  )
}
