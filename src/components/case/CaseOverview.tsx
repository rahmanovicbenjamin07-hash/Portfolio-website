import type { Project } from "../../types/project";
import "./CaseOverview.css";

// Section 02 — Overview. Markup copied from design-reference/case-study.html (<section aria-labelledby="ov-title">).
// TODO(agent 1): .wrap / .sec / .h2 come from src/styles/pages.css, imported by the page (not here).

export default function CaseOverview({ project }: { project: Project }) {
  return (
    <section className="wrap sec" aria-labelledby="ov-title">
      <p className="px-label">
        <i></i>02 — Overview
      </p>
      <h2 id="ov-title" className="h2">
        Where it started, <span>where we went and what changed.</span>
      </h2>
      <div className="three">
        <div>
          <h3>The challenge</h3>
          <p>{project.challenge}</p>
        </div>
        <div>
          <h3>The goal</h3>
          <p>{project.goal}</p>
        </div>
        <div>
          <h3>The result</h3>
          <p>{project.result}</p>
        </div>
      </div>
    </section>
  );
}
