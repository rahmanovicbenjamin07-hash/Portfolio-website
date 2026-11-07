import type { Project } from "../../types/project";
import { imageSize } from "../../data/imageSizes";
import "./CaseMobile.css";

// Section 01 — On mobile. Markup copied from design-reference/case-study.html (<section aria-labelledby="mb-title">).
// Three pixel phones from project.mobileShots: the screenshot fills the screen, or the checkered placeholder shows
// its label when there's no image yet.
// TODO(agent 1): .wrap / .sec / .h2 come from src/styles/pages.css, imported by the page (not here).

export default function CaseMobile({ project }: { project: Project }) {
  if (project.mobileShots.length === 0) return null;

  return (
    <section className="wrap sec" aria-labelledby="mb-title">
      <p className="px-label">
        <i></i>01 — On mobile
      </p>
      <h2 id="mb-title" className="h2">
        Built for phones <span>from the first sketch.</span>
      </h2>
      <div className="phones">
        {project.mobileShots.map((shot, i) => (
          <figure key={i} className="phone-col" style={{ margin: 0 }}>
            {/* Hidden from screen readers as in the reference: the caption below describes the screen. */}
            <div className="phone" aria-hidden="true">
              <span className="speaker"></span>
              <div className="pscreen">
                {shot.image ? (
                  <img src={shot.image} alt="" {...imageSize(shot.image)} loading="lazy" decoding="async" />
                ) : (
                  <>
                    Mobile crop
                    <br />
                    {shot.title} · 390 × 844
                  </>
                )}
              </div>
            </div>
            <figcaption className="cap">
              <b>{shot.title}</b> — {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
