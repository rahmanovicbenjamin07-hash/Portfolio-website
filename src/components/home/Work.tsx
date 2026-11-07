import type { CSSProperties } from "react";
import PixelArrow from "../pixel/PixelArrow";
import work from "../../data/work";
import "./Work.css";
import PixelText from "../PixelText";

// Section 01 — Selected work. Markup copied from design-reference/home.html (<section id="work">).
// Card content lives in src/data/work.ts.

const titleStyle: CSSProperties = {
  margin: "16px 0 0",
  maxWidth: 760,
  fontFamily: "'Inter Tight', Inter, sans-serif",
  fontSize: "clamp(32px, 3.3vw, 48px)",
  lineHeight: 1.08,
  fontWeight: 500,
  letterSpacing: "-0.02em",
  color: "#0E1B26",
};

// The home page shows three cards: the featured one (work.ts, featured: true) across the full width, then two side by
// side; one column from 1024px down (Work.css).
const HOME_CARDS = 3;

export default function Work() {
  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <p className="px-label">
        <i></i>01 — Selected work
      </p>
      <h2 id="work-title" style={titleStyle}>
        Selected work <span style={{ color: "#4A6070" }}>— websites I designed and built.</span>
      </h2>
      <div className="work-grid">
        {work.slice(0, HOME_CARDS).map((project) => (
          <a
            key={project.href}
            href={project.href}
            className={project.featured ? "card featured" : "card"}
            aria-label={`Case study: ${project.name}`}
          >
            <div className="shot">
              {project.image ? (
                <img
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  height={project.image.height}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                project.placeholder
              )}
            </div>
            <div className="card-foot">
              <span className="card-name">{project.name}</span>
              <span className="arrow">
                <PixelArrow color="#E4ECD6" />
              </span>
            </div>
          </a>
        ))}
      </div>
      {/* No all-work page yet: the button only appears once there are more projects than the home page shows. */}
      {work.length > HOME_CARDS && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 64 }}>
          <a href="#all-work" className="btn">
            <PixelText text="See all work" trigger="hover" /> <PixelArrow color="#36502F" />
          </a>
        </div>
      )}
    </section>
  );
}
