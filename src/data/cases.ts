import type { CaseStudy } from '../types/project'

// Case study page content, one entry per /work/:slug page, in page order. Copied 1:1 from
// design-reference/case-study/CASES.json: every text and image path on the page comes from here.
// One change from CASES.json, at the owner's request: WealthQuest's desktop image is hero.avif (the front-facing
// coin) instead of desktop.webp, in the showcase and in steps 1 and 5.
// Don't add text that isn't in the source. A new project only needs a new entry here (plus its SEO fields in
// src/data/projects.ts and its image sizes in src/components/case/caseImages.ts).

export const CASES: CaseStudy[] = [
  {
    "slug": "chairo",
    "name": "Chairo",
    "eyebrow": "Mobile app · Website · 2026",
    "title": {
      "lead": "Chairo, ",
      "accent": "online booking for barbershops and salons."
    },
    "intro": "An app my friend Amer Talo and I built so barbers can stop texting clients to set up appointments. Clients book themselves in three taps, and the shop sees its whole day and its numbers on one screen.",
    "liveLink": {
      "label": "Visit chairo.app",
      "url": "https://chairo.app/"
    },
    "projectFile": [
      {
        "label": "Team",
        "value": "Benjamin Rahmanović & Amer Talo"
      },
      {
        "label": "Role",
        "value": "Design, front-end, back-end, together"
      },
      {
        "label": "Platform",
        "value": "Android, iOS in App Store review"
      },
      {
        "label": "Stack",
        "value": "React Native, Expo, Supabase"
      },
      {
        "label": "Market",
        "value": "Bosnia & Herzegovina"
      },
      {
        "label": "Status",
        "value": "Early access, free"
      }
    ],
    "tags": [
      "Design",
      "Front-end",
      "Back-end"
    ],
    "showcase": {
      "windowName": "chairo.app",
      "desktop": {
        "src": "/images/work/chairo/desktop.webp",
        "alt": "The chairo.app website on desktop"
      },
      "mobile": [
        {
          "src": "/images/work/chairo/mobile-1.webp",
          "alt": "Who with? A barber carousel"
        },
        {
          "src": "/images/work/chairo/mobile-2.webp",
          "alt": "The service wheel with prices in KM"
        },
        {
          "src": "/images/work/chairo/mobile-3.webp",
          "alt": "Day and time wheel showing free times only"
        }
      ]
    },
    "how": {
      "title": {
        "lead": "From an idea between friends ",
        "accent": "to early access."
      },
      "intro": "How it came together, one step at a time.",
      "steps": [
        {
          "kind": "wide",
          "src": "/images/work/chairo/mockup.webp",
          "fileName": "chairo.png",
          "alt": "Chairo on a laptop and three phones",
          "title": "The idea",
          "text": "Where we live, booking a haircut still means messages and phone calls. Amer and I wanted to get rid of that: clients book themselves, any barber in the shop, at any free time."
        },
        {
          "kind": "phone",
          "src": "/images/work/chairo/mobile-1.webp",
          "fileName": "who-with.png",
          "alt": "Step 1 of booking: who with? A barber carousel",
          "title": "Three taps for clients",
          "text": "Barber, service, time. Clients find their shop with its code or a QR, swipe to their barber, and every choice fills in the title until the booking reads as one sentence."
        },
        {
          "kind": "wide",
          "src": "/images/work/chairo/desktop.webp",
          "fileName": "barber-side.png",
          "alt": "The chairo.app website showing the barber's day screen",
          "title": "The barber’s side",
          "text": "Each barber has their own schedule, and the day sits on one screen: appointments, breaks, no-shows and earnings. A client who keeps not showing up can’t book in the app anymore."
        },
        {
          "kind": "phone",
          "src": "/images/work/chairo/mobile-3.webp",
          "fileName": "free-times.png",
          "alt": "Day and time wheel showing free times only",
          "title": "Built together",
          "text": "We both did design, front-end and back-end, taking turns so one could rest while the other worked. React Native and Expo, with Supabase behind it. The time wheel only offers slots where the whole service fits."
        },
        {
          "kind": "wide",
          "src": "/images/work/chairo/mockup.webp",
          "fileName": "early-access.png",
          "alt": "Chairo on a laptop and three phones",
          "title": "Tested, then early access",
          "text": "Before Google Play accepted the Android app, 12 testers used it in a closed test. The iPhone version is in App Store review now, and early access is free."
        }
      ]
    },
    "next": {
      "name": "Top One Trader",
      "href": "/work/top-one-trader"
    }
  },
  {
    "slug": "top-one-trader",
    "name": "Top One Trader",
    "eyebrow": "Webflow website · Ongoing",
    "title": {
      "lead": "Top One Trader, ",
      "accent": "the site behind a prop firm’s 2.0."
    },
    "intro": "The Webflow site of a prop trading firm that funds traders on its own capital. I maintain it: updates every few days, a new discount code every month, A/B tests, and pricing that hands off to an external checkout.",
    "liveLink": {
      "label": "Visit toponetrader.com",
      "url": "https://www.toponetrader.com/"
    },
    "projectFile": [
      {
        "label": "Client",
        "value": "Top One Trader"
      },
      {
        "label": "Role",
        "value": "Webflow developer, maintenance"
      },
      {
        "label": "Design",
        "value": "Their agency"
      },
      {
        "label": "Platform",
        "value": "Webflow"
      },
      {
        "label": "Scope",
        "value": "Multi-page site, ongoing updates"
      },
      {
        "label": "Time",
        "value": "August 2026 – now"
      }
    ],
    "tags": [
      "Webflow development",
      "Custom code",
      "A/B tests"
    ],
    "showcase": {
      "windowName": "toponetrader.com",
      "desktop": {
        "src": "/images/work/top-one-trader/desktop.webp",
        "alt": "The Top One Trader website on desktop"
      },
      "mobile": [
        {
          "src": "/images/work/top-one-trader/mobile-1.webp",
          "alt": "Mobile hero with the discount code"
        },
        {
          "src": "/images/work/top-one-trader/mobile-2.webp",
          "alt": "The X-DAILY launch card with spots left"
        },
        {
          "src": "/images/work/top-one-trader/mobile-3.webp",
          "alt": "The account configuration list"
        }
      ]
    },
    "how": {
      "title": {
        "lead": "Updated every few days, ",
        "accent": "live the whole time."
      },
      "intro": "How it came together, one step at a time.",
      "steps": [
        {
          "kind": "wide",
          "src": "/images/work/top-one-trader/desktop.webp",
          "fileName": "toponetrader.png",
          "alt": "The Top One Trader website on desktop",
          "title": "The job",
          "text": "Their agency designs the site, and I keep it running in Webflow. New offers, sections and pages go live every few days."
        },
        {
          "kind": "phone",
          "src": "/images/work/top-one-trader/mobile-1.webp",
          "fileName": "hero.png",
          "alt": "Mobile hero with the discount code",
          "title": "A new code every month",
          "text": "The promo bar, the headline and the main button fit on the first phone screen, with the month’s code next to “Start trading now”. September had SEP, October had OCT, then Halloween, and now Black Friday."
        },
        {
          "kind": "phone",
          "src": "/images/work/top-one-trader/mobile-2.webp",
          "fileName": "launchpad.png",
          "alt": "The X-DAILY launch card with spots left",
          "title": "Launches with spots running out",
          "text": "New account types launch on the Launch Pad. The X-DAILY card shows how many spots are left and has its own discount code, copied in one tap."
        },
        {
          "kind": "phone",
          "src": "/images/work/top-one-trader/mobile-3.webp",
          "fileName": "pricing.png",
          "alt": "The account configuration list",
          "title": "Pricing into checkout",
          "text": "The pricing lays out account size, profit split, loss limits and leverage in one list, with info buttons for the tricky terms. Picking a plan hands off to an external checkout."
        },
        {
          "kind": "wide",
          "src": "/images/work/top-one-trader/desktop.webp",
          "fileName": "ab-test.png",
          "alt": "The Top One Trader website on desktop",
          "title": "Two pages at once",
          "text": "We usually have two versions of a page running at the same time as an A/B test, and the results decide which one stays."
        }
      ]
    },
    "next": {
      "name": "WealthQuest",
      "href": "/work/wealthquest"
    }
  },
  {
    "slug": "wealthquest",
    "name": "WealthQuest",
    "eyebrow": "Marketing website · 2026",
    "title": {
      "lead": "WealthQuest, ",
      "accent": "a membership club’s site, built pixel for pixel."
    },
    "intro": "A pixel-perfect Webflow build of the site for WealthQuest, a global club for people building wealth in every part of life. Built from their Figma design, with custom-coded animations.",
    "liveLink": {
      "label": "Visit wealthquest.com",
      "url": "https://www.wealthquest.com/"
    },
    "projectFile": [
      {
        "label": "Client",
        "value": "WealthQuest"
      },
      {
        "label": "Role",
        "value": "Webflow developer"
      },
      {
        "label": "Design",
        "value": "Their team, in Figma"
      },
      {
        "label": "Platform",
        "value": "Webflow"
      },
      {
        "label": "Scope",
        "value": "Marketing website"
      },
      {
        "label": "Time",
        "value": "August 2026 – now"
      }
    ],
    "tags": [
      "Webflow development",
      "Custom code",
      "Figma"
    ],
    "showcase": {
      "windowName": "wealthquest.com",
      "desktop": {
        "src": "/images/work/wealthquest/hero.avif",
        "alt": "The WealthQuest website on desktop"
      },
      "mobile": [
        {
          "src": "/images/work/wealthquest/mobile-1.webp",
          "alt": "Mobile hero with the gold coin"
        },
        {
          "src": "/images/work/wealthquest/mobile-2.webp",
          "alt": "The Crossroads section on mobile"
        },
        {
          "src": "/images/work/wealthquest/mobile-3.webp",
          "alt": "The WealthQuest reveal on mobile"
        }
      ]
    },
    "how": {
      "title": {
        "lead": "From the Figma file ",
        "accent": "to a live site."
      },
      "intro": "How it came together, one step at a time.",
      "steps": [
        {
          "kind": "wide",
          "src": "/images/work/wealthquest/hero.avif",
          "fileName": "figma-to-webflow.png",
          "alt": "The WealthQuest website on desktop",
          "title": "From the Figma file",
          "text": "Their team designed the site in Figma. I built it in Webflow section by section, matching the type, spacing and the gold-and-green look."
        },
        {
          "kind": "phone",
          "src": "/images/work/wealthquest/mobile-1.webp",
          "fileName": "hero.png",
          "alt": "Mobile hero with the gold coin",
          "title": "One club, one coin",
          "text": "An uppercase headline, one sentence on what the club is, a gold Join button, and the WealthQuest coin underneath."
        },
        {
          "kind": "phone",
          "src": "/images/work/wealthquest/mobile-2.webp",
          "fileName": "crossroad.png",
          "alt": "The Crossroads section on mobile",
          "title": "The problem, in one number",
          "text": "Before the club appears, the site sets up why it matters: one big headline, a short line and one number per screen."
        },
        {
          "kind": "phone",
          "src": "/images/work/wealthquest/mobile-3.webp",
          "fileName": "introducing.png",
          "alt": "The WealthQuest reveal on mobile",
          "title": "The reveal",
          "text": "Only then does the club appear: the gold crest over a globe, the WealthQuest name and the True Wealth Club line."
        },
        {
          "kind": "wide",
          "src": "/images/work/wealthquest/hero.avif",
          "fileName": "animations.png",
          "alt": "The WealthQuest website on desktop",
          "title": "Custom-coded motion",
          "text": "The animations are coded by hand: a planet that follows your mouse, a triangle that appears in one of the sections, and an animated pricing section."
        }
      ]
    },
    "next": {
      "name": "Chairo",
      "href": "/work/chairo"
    }
  }
]
