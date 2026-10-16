import { useState } from 'react'
import styles from './Faq.module.css'

// Text in [brackets] is a placeholder until Benjamin confirms it.
const FAQS = [
  { q: 'How fast can you start?', a: 'Usually within 48 hours of getting the design and access. [Adjust to your real availability.]' },
  { q: 'Do you work white-label and under NDA?', a: "Yes. I work behind your agency's brand, sign your NDA, and never contact your client unless you ask me to." },
  { q: 'What time zone are you in?', a: 'Central European Time. I overlap with European teams all day, and with US teams in my afternoon.' },
  { q: 'How do you price?', a: 'Hourly or per project, depending on the scope. [Your rate or starting price.]' },
  { q: 'Who owns the website?', a: 'You and your client do. The site and all files are handed over at the end, with a short video showing how to edit it.' },
  { q: 'What do you need to get started?', a: "A Figma file (or a brief, if I'm designing), access to the Webflow workspace, and a deadline." },
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section aria-labelledby="faq-heading" className={styles.faq}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <div className={styles.label}>[ FAQ ]</div>
          <h2 id="faq-heading" className={styles.heading}>
            Questions agencies ask first.
          </h2>
          <p className={styles.text}>Anything else? Ask me on a quick call.</p>
          <a href="#contact" className={styles.button}>
            Book a 15-min call
          </a>
        </div>

        <div className={styles.list}>
          {FAQS.map((f, i) => (
            <div key={f.q} className={styles.item}>
              <h3 className={styles.questionHeading}>
                <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)} className={styles.question}>
                  <span>{f.q}</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className={`${styles.icon} ${open === i ? styles.iconOpen : ''}`}
                  >
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                  </svg>
                </button>
              </h3>
              {open === i && <p className={styles.answer}>{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
