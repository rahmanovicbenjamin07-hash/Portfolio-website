// Section label + heading, as in design-reference/case-study/case-study.html:
// <p class="px-label"><i></i>01 — Overview</p><h2 class="h2">Title <span>accent.</span></h2>
// num is the section's place in the rendered order ("01", "02", …), set by src/pages/CaseStudy.tsx.
type Props = { id: string; num: string; label: string; title: string; accent: string }

export default function SectionHead({ id, num, label, title, accent }: Props) {
  return (
    <>
      <p className="px-label">
        <i></i>
        {num} — {label}
      </p>
      <h2 id={id} className="h2">
        {title} <span>{accent}</span>
      </h2>
    </>
  )
}
