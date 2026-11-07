import experience from '../../data/experience'
import './Experience.css'

// "01 — Experience", copied from design-reference/about.html: intro on the left, the dotted timeline on
// the right. .wrap/.sec/.h2/.ab-two/.ab-side come from src/styles/pages.css. Content: src/data/experience.ts.
export default function Experience() {
  return (
    <section className="wrap sec ab-two" aria-labelledby="exp-title">
      <div>
        <p className="px-label">
          <i></i>01 — Experience
        </p>
        <h2 id="exp-title" className="h2">
          What I've done <span>so far.</span>
        </h2>
        <p className="ab-side">The short version of my path: where I worked, what I learned and what I do now.</p>
      </div>
      <ol className="tl">
        {experience.map((item) => (
          <li key={`${item.time}-${item.role}`} className={item.now ? 'now' : undefined}>
            <time>{item.time}</time>
            <h3>{item.role}</h3>
            <span className="where">{item.where}</span>
            <p>{item.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
