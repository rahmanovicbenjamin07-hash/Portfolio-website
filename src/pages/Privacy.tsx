import Seo from '../seo/Seo'
import { PRIVACY_META } from '../seo/meta'
import site from '../data/site'
import Nav from '../components/home/Nav'
import Footer from '../components/home/Footer'
import PixelCursor from '../components/pixel/PixelCursor'
import './Privacy.css'

// Privacy policy at /privacy (linked from the footer). Nav + footer only, no Contact block.
// .pixel-page scopes the global pixel styles, as on the other pages. The email comes from src/data/site.ts.
// The services named below match what the site really uses: Google Fonts (index.html), Calendly ("Let's talk"),
// Upwork (footer socials). No analytics. Update the text and the date if any of that changes.
export default function Privacy() {
  const { email } = site
  return (
    <div className="pixel-page">
      {/* Title and description live in src/seo/meta.ts. */}
      <Seo {...PRIVACY_META} path="/privacy" />
      <div className="pv-top">
        {/* No #contact section on this page, so the Nav's Contact link goes to the home page's. */}
        <Nav variant="page" hasFooter={false} />
        <section className="pv-head">
          <p className="px-label"><i></i>Legal</p>
          <h1>Privacy policy. <span>Short and plain.</span></h1>
          <p>What happens to your data when you visit this site, book a call or send me an email.</p>
          <p className="pv-meta">Last updated: 8 November 2026</p>
        </section>
      </div>
      <main className="pv-body">
        <nav className="pv-toc" aria-label="On this page"><b>On this page</b>
          <a href="#who">01 · Who I am</a><a href="#collect">02 · What I collect</a><a href="#why">03 · Why I use it</a><a href="#cookies">04 · Cookies</a><a href="#share">05 · Who else sees it</a><a href="#keep">06 · How long I keep it</a><a href="#rights">07 · Your rights</a><a href="#changes">08 · Changes</a>
        </nav>
        <article className="pv-doc">
          <h2 id="who"><em>01</em>Who I am</h2>
          <p>This website belongs to Benjamin Rahmanović, a freelance web designer and Webflow &amp; React developer based in Tešanj, Bosnia and Herzegovina. I'm responsible for the personal data described here.</p>
          <p>Contact: <a href={`mailto:${email}`}>{email}</a></p>

          <h2 id="collect"><em>02</em>What I collect</h2>
          <p>This site has no contact form, no account and no newsletter. I don't collect personal data through the site itself.</p>
          <p>Some data is still processed when you visit or get in touch:</p>
          <ul>
            <li><b>Technical data.</b> When you load a page, my hosting provider receives your IP address, browser and device type in server logs. This keeps the site running and protects it from abuse.</li>
            <li><b>Fonts.</b> The fonts load from Google Fonts, so your browser sends your IP address to Google.</li>
            <li><b>Booking a call.</b> "Let's talk" opens Calendly. The details you enter there (name, email, notes) go to Calendly and to me, so we can hold the call.</li>
            <li><b>Email and Upwork.</b> If you write to me, I keep your message and email address to reply and to work with you.</li>
          </ul>

          <h2 id="why"><em>03</em>Why I use it</h2>
          <ul>
            <li>To run and secure the website (my legitimate interest).</li>
            <li>To answer your message and book calls (steps before a contract, at your request).</li>
            <li>To deliver a project we agree on (performing the contract).</li>
          </ul>

          <h2 id="cookies"><em>04</em>Cookies</h2>
          <p>The site itself doesn't set tracking cookies. Calendly and other services you open from here may set their own cookies on their own pages.</p>

          <h2 id="share"><em>05</em>Who else sees it</h2>
          <p>I don't sell your data. It's only shared with the services above: my hosting provider, Google Fonts, Calendly, my email provider and Upwork. Each handles it under its own privacy policy.</p>

          <h2 id="keep"><em>06</em>How long I keep it</h2>
          <p>I keep emails and project messages for as long as we work together and up to 3 years after, unless you ask me to delete them sooner. Server logs are kept by the hosting provider for a short time.</p>

          <h2 id="rights"><em>07</em>Your rights</h2>
          <p>You can ask me what data I have about you, and ask me to correct or delete it. You can also object to how I use it, or complain to your local data protection authority. Just email me and I'll reply within 30 days.</p>

          <h2 id="changes"><em>08</em>Changes</h2>
          <p>If this policy changes, I'll update the date at the top of this page.</p>
        </article>
      </main>
      <Footer />
      <PixelCursor />
    </div>
  )
}
