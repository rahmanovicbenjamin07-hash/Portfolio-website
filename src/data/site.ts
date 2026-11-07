import { CALENDLY, GITHUB, LINKEDIN, NAME, UPWORK } from '../seo/site'

// Shared site data for the pixel home page. Real values come from src/seo/site.ts (single source of truth).
const site = {
  name: NAME,
  email: 'rahmanovicbenjamin07@gmail.com',
  city: 'Tešanj',
  letsTalkUrl: CALENDLY, // replace with your Upwork / Calendly / Google Meet link
  socials: { linkedin: LINKEDIN, github: GITHUB, upwork: UPWORK },
}
export default site
