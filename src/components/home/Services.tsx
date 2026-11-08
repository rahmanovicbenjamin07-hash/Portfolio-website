import type { CSSProperties, ReactElement } from "react";
import services from "../../data/services";
import type { ServiceIcon } from "../../data/services";
import "./Services.css";

// Section 02 — What I do. Markup copied from design-reference/home.html (<section id="services">),
// inline styles kept as in the reference. Content lives in src/data/services.ts.

const sectionStyle: CSSProperties = {
  boxSizing: "border-box",
  padding: "40px 0 120px",
  paddingInline: "var(--pad-x)",
  background: "#ffffff",
};

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

// Pixel icons, copied from the reference's inline SVGs.
const ICONS: Record<ServiceIcon, ReactElement> = {
  design: (
    <svg className="cic" viewBox="0 0 12 12" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="8" y="0" width="1" height="1" fill="#36502F" />
      <rect x="9" y="0" width="1" height="1" fill="#36502F" />
      <rect x="7" y="1" width="1" height="1" fill="#36502F" />
      <rect x="8" y="1" width="1" height="1" fill="#E0705C" />
      <rect x="9" y="1" width="1" height="1" fill="#E0705C" />
      <rect x="10" y="1" width="1" height="1" fill="#36502F" />
      <rect x="6" y="2" width="1" height="1" fill="#36502F" />
      <rect x="7" y="2" width="1" height="1" fill="#E0705C" />
      <rect x="8" y="2" width="1" height="1" fill="#E0705C" />
      <rect x="9" y="2" width="1" height="1" fill="#E0705C" />
      <rect x="10" y="2" width="1" height="1" fill="#36502F" />
      <rect x="5" y="3" width="1" height="1" fill="#36502F" />
      <rect x="6" y="3" width="1" height="1" fill="#E8C547" />
      <rect x="7" y="3" width="1" height="1" fill="#E8C547" />
      <rect x="8" y="3" width="1" height="1" fill="#E0705C" />
      <rect x="9" y="3" width="1" height="1" fill="#36502F" />
      <rect x="4" y="4" width="1" height="1" fill="#36502F" />
      <rect x="5" y="4" width="1" height="1" fill="#E8C547" />
      <rect x="6" y="4" width="1" height="1" fill="#E8C547" />
      <rect x="7" y="4" width="1" height="1" fill="#E8C547" />
      <rect x="8" y="4" width="1" height="1" fill="#36502F" />
      <rect x="3" y="5" width="1" height="1" fill="#36502F" />
      <rect x="4" y="5" width="1" height="1" fill="#E8C547" />
      <rect x="5" y="5" width="1" height="1" fill="#E8C547" />
      <rect x="6" y="5" width="1" height="1" fill="#E8C547" />
      <rect x="7" y="5" width="1" height="1" fill="#36502F" />
      <rect x="2" y="6" width="1" height="1" fill="#36502F" />
      <rect x="3" y="6" width="1" height="1" fill="#E8C547" />
      <rect x="4" y="6" width="1" height="1" fill="#E8C547" />
      <rect x="5" y="6" width="1" height="1" fill="#E8C547" />
      <rect x="6" y="6" width="1" height="1" fill="#36502F" />
      <rect x="1" y="7" width="1" height="1" fill="#36502F" />
      <rect x="2" y="7" width="1" height="1" fill="#F2D7A6" />
      <rect x="3" y="7" width="1" height="1" fill="#E8C547" />
      <rect x="4" y="7" width="1" height="1" fill="#E8C547" />
      <rect x="5" y="7" width="1" height="1" fill="#36502F" />
      <rect x="1" y="8" width="1" height="1" fill="#36502F" />
      <rect x="2" y="8" width="1" height="1" fill="#F2D7A6" />
      <rect x="3" y="8" width="1" height="1" fill="#F2D7A6" />
      <rect x="4" y="8" width="1" height="1" fill="#36502F" />
      <rect x="0" y="9" width="1" height="1" fill="#36502F" />
      <rect x="1" y="9" width="1" height="1" fill="#1F2A2E" />
      <rect x="2" y="9" width="1" height="1" fill="#F2D7A6" />
      <rect x="3" y="9" width="1" height="1" fill="#36502F" />
      <rect x="0" y="10" width="1" height="1" fill="#36502F" />
      <rect x="1" y="10" width="1" height="1" fill="#1F2A2E" />
      <rect x="2" y="10" width="1" height="1" fill="#36502F" />
      <rect x="0" y="11" width="1" height="1" fill="#36502F" />
      <rect x="1" y="11" width="1" height="1" fill="#36502F" />
    </svg>
  ),
  webflow: (
    <svg className="cic" viewBox="0 0 12 12" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="2" y="1" width="1" height="1" fill="#36502F" />
      <rect x="3" y="1" width="1" height="1" fill="#36502F" />
      <rect x="4" y="1" width="1" height="1" fill="#36502F" />
      <rect x="5" y="1" width="1" height="1" fill="#36502F" />
      <rect x="6" y="1" width="1" height="1" fill="#36502F" />
      <rect x="7" y="1" width="1" height="1" fill="#36502F" />
      <rect x="8" y="1" width="1" height="1" fill="#36502F" />
      <rect x="9" y="1" width="1" height="1" fill="#36502F" />
      <rect x="2" y="2" width="1" height="1" fill="#36502F" />
      <rect x="3" y="2" width="1" height="1" fill="#146EF5" />
      <rect x="4" y="2" width="1" height="1" fill="#146EF5" />
      <rect x="5" y="2" width="1" height="1" fill="#146EF5" />
      <rect x="6" y="2" width="1" height="1" fill="#146EF5" />
      <rect x="7" y="2" width="1" height="1" fill="#146EF5" />
      <rect x="8" y="2" width="1" height="1" fill="#146EF5" />
      <rect x="9" y="2" width="1" height="1" fill="#36502F" />
      <rect x="2" y="3" width="1" height="1" fill="#36502F" />
      <rect x="3" y="3" width="1" height="1" fill="#36502F" />
      <rect x="4" y="3" width="1" height="1" fill="#36502F" />
      <rect x="5" y="3" width="1" height="1" fill="#36502F" />
      <rect x="6" y="3" width="1" height="1" fill="#36502F" />
      <rect x="7" y="3" width="1" height="1" fill="#36502F" />
      <rect x="8" y="3" width="1" height="1" fill="#36502F" />
      <rect x="9" y="3" width="1" height="1" fill="#36502F" />
      <rect x="1" y="4" width="1" height="1" fill="#36502F" />
      <rect x="2" y="4" width="1" height="1" fill="#36502F" />
      <rect x="3" y="4" width="1" height="1" fill="#36502F" />
      <rect x="4" y="4" width="1" height="1" fill="#36502F" />
      <rect x="5" y="4" width="1" height="1" fill="#36502F" />
      <rect x="6" y="4" width="1" height="1" fill="#36502F" />
      <rect x="7" y="4" width="1" height="1" fill="#36502F" />
      <rect x="8" y="4" width="1" height="1" fill="#36502F" />
      <rect x="9" y="4" width="1" height="1" fill="#36502F" />
      <rect x="10" y="4" width="1" height="1" fill="#36502F" />
      <rect x="1" y="5" width="1" height="1" fill="#36502F" />
      <rect x="2" y="5" width="1" height="1" fill="#7CC46B" />
      <rect x="3" y="5" width="1" height="1" fill="#7CC46B" />
      <rect x="4" y="5" width="1" height="1" fill="#7CC46B" />
      <rect x="5" y="5" width="1" height="1" fill="#7CC46B" />
      <rect x="6" y="5" width="1" height="1" fill="#36502F" />
      <rect x="7" y="5" width="1" height="1" fill="#E8C547" />
      <rect x="8" y="5" width="1" height="1" fill="#E8C547" />
      <rect x="9" y="5" width="1" height="1" fill="#E8C547" />
      <rect x="10" y="5" width="1" height="1" fill="#36502F" />
      <rect x="1" y="6" width="1" height="1" fill="#36502F" />
      <rect x="2" y="6" width="1" height="1" fill="#36502F" />
      <rect x="3" y="6" width="1" height="1" fill="#36502F" />
      <rect x="4" y="6" width="1" height="1" fill="#36502F" />
      <rect x="5" y="6" width="1" height="1" fill="#36502F" />
      <rect x="6" y="6" width="1" height="1" fill="#36502F" />
      <rect x="7" y="6" width="1" height="1" fill="#36502F" />
      <rect x="8" y="6" width="1" height="1" fill="#36502F" />
      <rect x="9" y="6" width="1" height="1" fill="#36502F" />
      <rect x="10" y="6" width="1" height="1" fill="#36502F" />
      <rect x="0" y="7" width="1" height="1" fill="#36502F" />
      <rect x="1" y="7" width="1" height="1" fill="#36502F" />
      <rect x="2" y="7" width="1" height="1" fill="#36502F" />
      <rect x="3" y="7" width="1" height="1" fill="#36502F" />
      <rect x="4" y="7" width="1" height="1" fill="#36502F" />
      <rect x="5" y="7" width="1" height="1" fill="#36502F" />
      <rect x="6" y="7" width="1" height="1" fill="#36502F" />
      <rect x="7" y="7" width="1" height="1" fill="#36502F" />
      <rect x="8" y="7" width="1" height="1" fill="#36502F" />
      <rect x="9" y="7" width="1" height="1" fill="#36502F" />
      <rect x="10" y="7" width="1" height="1" fill="#36502F" />
      <rect x="11" y="7" width="1" height="1" fill="#36502F" />
      <rect x="0" y="8" width="1" height="1" fill="#36502F" />
      <rect x="1" y="8" width="1" height="1" fill="#E8C547" />
      <rect x="2" y="8" width="1" height="1" fill="#E8C547" />
      <rect x="3" y="8" width="1" height="1" fill="#E8C547" />
      <rect x="4" y="8" width="1" height="1" fill="#36502F" />
      <rect x="5" y="8" width="1" height="1" fill="#146EF5" />
      <rect x="6" y="8" width="1" height="1" fill="#146EF5" />
      <rect x="7" y="8" width="1" height="1" fill="#146EF5" />
      <rect x="8" y="8" width="1" height="1" fill="#36502F" />
      <rect x="9" y="8" width="1" height="1" fill="#7CC46B" />
      <rect x="10" y="8" width="1" height="1" fill="#7CC46B" />
      <rect x="11" y="8" width="1" height="1" fill="#36502F" />
      <rect x="0" y="9" width="1" height="1" fill="#36502F" />
      <rect x="1" y="9" width="1" height="1" fill="#36502F" />
      <rect x="2" y="9" width="1" height="1" fill="#36502F" />
      <rect x="3" y="9" width="1" height="1" fill="#36502F" />
      <rect x="4" y="9" width="1" height="1" fill="#36502F" />
      <rect x="5" y="9" width="1" height="1" fill="#36502F" />
      <rect x="6" y="9" width="1" height="1" fill="#36502F" />
      <rect x="7" y="9" width="1" height="1" fill="#36502F" />
      <rect x="8" y="9" width="1" height="1" fill="#36502F" />
      <rect x="9" y="9" width="1" height="1" fill="#36502F" />
      <rect x="10" y="9" width="1" height="1" fill="#36502F" />
      <rect x="11" y="9" width="1" height="1" fill="#36502F" />
    </svg>
  ),
  react: (
    <svg className="cic" viewBox="0 0 15 9" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="3" y="1" width="1" height="1" fill="#146EF5" />
      <rect x="10" y="1" width="1" height="1" fill="#36502F" />
      <rect x="12" y="1" width="1" height="1" fill="#146EF5" />
      <rect x="2" y="2" width="1" height="1" fill="#146EF5" />
      <rect x="3" y="2" width="1" height="1" fill="#146EF5" />
      <rect x="9" y="2" width="1" height="1" fill="#36502F" />
      <rect x="10" y="2" width="1" height="1" fill="#36502F" />
      <rect x="12" y="2" width="1" height="1" fill="#146EF5" />
      <rect x="13" y="2" width="1" height="1" fill="#146EF5" />
      <rect x="1" y="3" width="1" height="1" fill="#146EF5" />
      <rect x="2" y="3" width="1" height="1" fill="#146EF5" />
      <rect x="9" y="3" width="1" height="1" fill="#36502F" />
      <rect x="13" y="3" width="1" height="1" fill="#146EF5" />
      <rect x="14" y="3" width="1" height="1" fill="#146EF5" />
      <rect x="0" y="4" width="1" height="1" fill="#146EF5" />
      <rect x="1" y="4" width="1" height="1" fill="#146EF5" />
      <rect x="8" y="4" width="1" height="1" fill="#36502F" />
      <rect x="9" y="4" width="1" height="1" fill="#36502F" />
      <rect x="14" y="4" width="1" height="1" fill="#146EF5" />
      <rect x="1" y="5" width="1" height="1" fill="#146EF5" />
      <rect x="2" y="5" width="1" height="1" fill="#146EF5" />
      <rect x="8" y="5" width="1" height="1" fill="#36502F" />
      <rect x="13" y="5" width="1" height="1" fill="#146EF5" />
      <rect x="14" y="5" width="1" height="1" fill="#146EF5" />
      <rect x="2" y="6" width="1" height="1" fill="#146EF5" />
      <rect x="3" y="6" width="1" height="1" fill="#146EF5" />
      <rect x="7" y="6" width="1" height="1" fill="#36502F" />
      <rect x="8" y="6" width="1" height="1" fill="#36502F" />
      <rect x="12" y="6" width="1" height="1" fill="#146EF5" />
      <rect x="13" y="6" width="1" height="1" fill="#146EF5" />
      <rect x="3" y="7" width="1" height="1" fill="#146EF5" />
      <rect x="7" y="7" width="1" height="1" fill="#36502F" />
      <rect x="12" y="7" width="1" height="1" fill="#146EF5" />
    </svg>
  ),
};

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" style={sectionStyle}>
      <p className="px-label">
        <i></i>02 — What I do
      </p>
      <h2 id="services-title" style={titleStyle}>
        Services <span style={{ color: "#146EF5" }}>— design, Webflow and React, end to end.</span>
      </h2>
      <div className="clist">
        {services.map((service) => (
          // Plain rows, not links: clicking one should do nothing (it used to jump to its own #anchor).
          <div key={service.icon} className="crow">
            <span className="cnum">{service.number}</span>
            <span className="ctitle">{service.title}</span>
            <span className="cdesc">{service.description}</span>
            {ICONS[service.icon]}
          </div>
        ))}
      </div>
    </section>
  );
}
