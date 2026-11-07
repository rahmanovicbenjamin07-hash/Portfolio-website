// Process section (src/components/home/Process.tsx): the chat lines and the live-screen captions.

export type StepKey = 'discovery' | 'concept' | 'feedback' | 'build' | 'preview' | 'launch'

export type ProcessLine = {
  k: 'you' | 'me'
  who: string
  text: string
  step: string
  key: StepKey
}

export const PROCESS_LINES: ProcessLine[] = [
  { k: 'you', who: 'You', text: "Here's my business, my goals and what I need from the website.", step: '1 · Discovery', key: 'discovery' },
  { k: 'me', who: 'Me', text: "Here's how I'd approach it: the structure, the look and the direction.", step: '2 · Concept', key: 'concept' },
  { k: 'you', who: 'You', text: 'Could we change a few things?', step: '↺ Feedback', key: 'feedback' },
  { k: 'me', who: 'Me', text: 'Of course. We tweak it together until we both agree.', step: '↺ Feedback', key: 'feedback' },
  { k: 'me', who: 'Me', text: "Perfect, I'm on it. Designing and building everything now.", step: '3 · Build', key: 'build' },
  { k: 'me', who: 'Me', text: "It's ready. Here's the full preview before anything goes live.", step: '4 · Final preview', key: 'preview' },
  { k: 'you', who: 'You', text: "Looks great, let's launch!", step: '5 · Launch', key: 'launch' },
  { k: 'me', who: 'Me', text: 'Published and handed over. Your site is live.', step: '5 · Launch', key: 'launch' },
]

export const PROCESS_CAPTIONS: Record<StepKey, string> = {
  discovery: 'Step 1 · Discovery',
  concept: 'Step 2 · Concept',
  feedback: '↺ We tweak it together',
  build: 'Step 3 · Build',
  preview: 'Step 4 · Final preview',
  launch: 'Step 5 · Launch',
}

/* The five steps shown as dots; "feedback" reuses the concept screen. */
export const PROCESS_ORDER = ['discovery', 'concept', 'build', 'preview', 'launch'] as const

/* Pixel art from design-reference/home.html (identical in case-study.html's level map), stored as grids.
   Each letter is an index into `palette` (a = 0, b = 1, ...), "." is empty. */
export type Pixels = { w: number; h: number; palette: string[]; rows: string[] }

/* The five step illustrations: home Process live screen + case-study level tiles. */
const DISCOVERY: Pixels = {
  w: 24,
  h: 16,
  palette: ['#1F2A2E', '#FFFFFF', '#36502F', '#0B3F8F', '#146EF5'],
  rows: [
    '.aaaaaaaaaaaaa..........',
    'abbbbbbbbbbbbba.........',
    'abbbbbbbbbbbbba.........',
    'abbccbbccbbccba.........',
    'abbccbbccbbccba.........',
    'abbbbbbbbbbbbba.........',
    '.aabaaaaaaaaaa..........',
    '..aa.....dddddddddddddd.',
    '..a.....deeeeeeeeeeeeeed',
    '........deeeeeeeeeeeeeed',
    '........deebbeebbeebbeed',
    '........deebbeebbeebbeed',
    '........deeeeeeeeeeeeeed',
    '.........dddddddddddedd.',
    '...................ded..',
    '....................dd..',
  ],
}

const CONCEPT: Pixels = {
  w: 24,
  h: 17,
  palette: ['#1F2A2E', '#F4F7EE', '#36502F', '#A9B4A0', '#BFD8FF', '#E8C547', '#7CC46B', '#146EF5'],
  rows: [
    'aaaaaaaaaaaaaaaaaaaaaaaa',
    'abbbbbbbbbbbbbbbbbbbbbba',
    'abcccccccbbbbbbdddddddba',
    'abbbbbbbbbbbbbbbbbbbbbba',
    'abeeeeeeeeeeeeeeeeeeeeba',
    'abeeeeeeeeeeeeeeeffeeeba',
    'abeeeeeeeeeeeeeeeffeeeba',
    'abeeeeeegggeeeeeeeeeeeba',
    'abeeeeegggggeeeegggeeeba',
    'abggggggggggggggggggggba',
    'abbbbbbbbbbbbbbbbbbbbbba',
    'abcccccccccccbbbbbbbbbba',
    'abddddddddddddddddbbbbba',
    'abddddddddddddbbbbbbbbba',
    'abhhhhhbbbbbbbbbbbbbbbba',
    'abbbbbbbbbbbbbbbbbbbbbba',
    'aaaaaaaaaaaaaaaaaaaaaaaa',
  ],
}

const BUILD: Pixels = {
  w: 24,
  h: 15,
  palette: ['#1F2A2E', '#2B3D44', '#146EF5', '#7CC46B', '#E8C547', '#E0705C', '#FFFFFF', '#A9B4A0', '#F4F7EE'],
  rows: [
    '...aaaaaaaaaaaaaaaaaa...',
    '...abbbbbbbbbbbbbbbba...',
    '...abcccbdddddbbbbbba...',
    '...abbbeeeebcccccbbba...',
    '...abbbbbbddddddbbbba...',
    '...abbbffffbeeebbbbba...',
    '...abccccbbbbbbbbbbba...',
    '...abbbddddddddbbbbba...',
    '...abbbbbbbbbbbbgbbba...',
    '...abbbbbbbbbbbbbbbba...',
    '...aaaaaaaaaaaaaaaaaa...',
    '..ahhhhhhhhhhhhhhhhhha..',
    '.ahihihihihihihihihihia.',
    'ahhhhhhhhhhhhhhhhhhhhhha',
    'aaaaaaaaaaaaaaaaaaaaaaaa',
  ],
}

const PREVIEW: Pixels = {
  w: 24,
  h: 17,
  palette: ['#1F2A2E', '#36502F', '#E0705C', '#E8C547', '#7CC46B', '#F4F7EE', '#FFFFFF', '#146EF5'],
  rows: [
    'aaaaaaaaaaaaaaaaaaaaaaaa',
    'abcbdbebbbbbbbbbbbbbbbba',
    'abbbbbbbbbbbbbbbbbbbbbba',
    'affffffffffffffffffffffa',
    'affffffffffffffffffffffa',
    'affffffaaaaaaaaaaffffffa',
    'affffaaggggggggggaaffffa',
    'afffaggggghhhhgggggafffa',
    'affaggggghhaahhgggggaffa',
    'affaggggghhaahhgggggaffa',
    'afffaggggghhhhgggggafffa',
    'affffaaggggggggggaaffffa',
    'affffffaaaaaaaaaaffffffa',
    'affffffffffffffffffffffa',
    'affffffffffffffffffeeefa',
    'affffffffffffffffffeeefa',
    'aaaaaaaaaaaaaaaaaaaaaaaa',
  ],
}

const LAUNCH: Pixels = {
  w: 16,
  h: 20,
  palette: ['#1F2A2E', '#E0705C', '#FFFFFF', '#146EF5', '#BFD8FF', '#F0A04B', '#E8C547'],
  rows: [
    '.......aa.......',
    '......abba......',
    '.....abbbba.....',
    '.....acccca.....',
    '....acccccca....',
    '....accddcca....',
    '....acdeedca....',
    '....acdeedca....',
    '....accddcca....',
    '....acccccca....',
    '....acccccca....',
    '...aaccccccaa...',
    '..abaccccccaba..',
    '.abbaccccccabba.',
    '.abbaaaaaaaabba.',
    '.aaa..affa..aaa.',
    '......fggf......',
    '.....fggggf.....',
    '......fggf......',
    '.......ff.......',
  ],
}

/* the "We tweak it together" loop arrow */
export const LOOP_ART: Pixels = {
  w: 40,
  h: 12,
  palette: ['currentColor'],
  rows: [
    '......aaaaaaaaaaaaaaaaaaaaaaaaaaaa......',
    '....aa............................aa....',
    '...a................................a...',
    '...a................................a...',
    '...a................................a...',
    '...a................................a...',
    '...a................................a...',
    '...a................................a...',
    '...a................................a...',
    '.aaaaa..................................',
    '..aaa...................................',
    '...a....................................',
  ],
}

export const STEP_ART: Record<(typeof PROCESS_ORDER)[number], Pixels> = {
  discovery: DISCOVERY,
  concept: CONCEPT,
  build: BUILD,
  preview: PREVIEW,
  launch: LAUNCH,
}

/* Case study, 03 — How it came together: the five levels (text from design-reference/case-study.html). */
export const CASE_STEPS: { key: (typeof PROCESS_ORDER)[number]; title: string; text: string }[] = [
  { key: 'discovery', title: 'Discovery', text: 'We talk about your goals, your needs and what the site should achieve.' },
  { key: 'concept', title: 'Concept', text: "I show you how I'd approach it: structure, look and direction." },
  { key: 'build', title: 'Build', text: 'Once we agree, I design and build everything.' },
  { key: 'preview', title: 'Final preview', text: 'You see the finished site before anything goes live.' },
  { key: 'launch', title: 'Launch', text: 'You approve it, and I publish and hand it over.' },
]
