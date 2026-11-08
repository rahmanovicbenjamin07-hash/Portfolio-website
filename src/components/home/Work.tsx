import PixelArrow from "../pixel/PixelArrow";
import PixelText from "../PixelText";
import site from "../../data/site";
import work, { WORK_HEADER } from "../../data/work";
import "./Work.css";

// Section 01 — Selected work: three project cards, each a laptop + phones mockup on the pixel grass scene.
// Content lives in src/data/work.ts. Keep id="work": the hero's "See my work" button scrolls here.

const external = /^https?:\/\//.test(site.letsTalkUrl);

export default function Work() {
  return (
    <section id="work" className="ws" aria-labelledby="work-title">
      <div className="ws-head">
        <div>
          <p className="px-label">
            <i></i>
            {WORK_HEADER.label}
          </p>
          <h2 id="work-title">
            {WORK_HEADER.title} <span>{WORK_HEADER.accent}</span>
          </h2>
          <p className="ws-intro">{WORK_HEADER.intro}</p>
        </div>
        <a href={site.letsTalkUrl} className="btn btn-dark" {...(external ? { target: "_blank", rel: "noopener" } : {})}>
          <PixelText text={WORK_HEADER.button} trigger="hover" /> <PixelArrow color="#ffffff" />
        </a>
      </div>
      <div className="ws-grid">
        {work.map((p) => (
          <article key={p.slug} className="ws-card">
            <div className="ws-bar">
              <i></i>
              <i></i>
              <i></i>
              <span>{p.file}</span>
            </div>
            <div className="ws-shot">
              <span className={p.badge === "App" ? "ws-badge app" : "ws-badge"}>{p.badge}</span>
              <img
                src={`/images/work/${p.slug}/mockup-transparent.webp`}
                alt={`${p.name} on a laptop and phones`}
                width={2400}
                height={1500}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="ws-body">
              {p.meta && <span className="ws-meta">{p.meta}</span>}
              <h3>
                {/* The card's link: its ::after covers the whole card, so hovering the card frames this heading. */}
                <a className="ws-link" href={`/work/${p.slug}`}>
                  {p.name}
                </a>
              </h3>
              <p>{p.summary}</p>
              <span className="ws-role">
                Role: <b>{p.role}</b>
              </span>
              <div className="ws-tags">
                {p.tags.map((t) => (
                  <span key={t} className="ws-tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="ws-foot">
                {/* Sits above the card link (z-index), so hovering it frames the button instead of the heading. */}
                <a className="btn ws-cta" href={`/work/${p.slug}`} aria-label={`${p.name} case study`}>
                  <PixelText text="Case study" trigger="hover" /> <PixelArrow />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
