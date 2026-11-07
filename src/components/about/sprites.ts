// Pixel icons of the About page, transcribed from design-reference/about.html: one character per pixel,
// "." = empty, every other character is a colour from the sprite palette. Drawn by PixelSprite.tsx.

export type Sprite = { width: number; height: number; palette: Record<string, string>; rows: string[] }

// Certificate (certificate cards)
export const CERTIFICATE: Sprite = {
  width: 12,
  height: 8,
  palette: {a: '#36502F', b: '#FFFFFF', c: '#A9B4A0', d: '#E0705C'},
  rows: [
    'aaaaaaaaaaaa',
    'abbbbbbbbbba',
    'abccccccccba',
    'abbbbbbbbbba',
    'abccccccbbba',
    'abbbbbbbddba',
    'abbbbbbdddda',
    'aaaaaaaaddaa',
  ],
}

// Chat bubbles (Clear communication)
export const CHAT: Sprite = {
  width: 24,
  height: 16,
  palette: {a: '#1F2A2E', b: '#FFFFFF', c: '#36502F', d: '#0B3F8F', e: '#146EF5'},
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

// Rocket (Fast, modern sites)
export const ROCKET: Sprite = {
  width: 16,
  height: 20,
  palette: {a: '#1F2A2E', b: '#E0705C', c: '#FFFFFF', d: '#146EF5', e: '#BFD8FF', f: '#F0A04B', g: '#E8C547'},
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

// Browser window (Easy to edit)
export const CMS: Sprite = {
  width: 24,
  height: 17,
  palette: {a: '#1F2A2E', b: '#F4F7EE', c: '#36502F', d: '#A9B4A0', e: '#BFD8FF', f: '#E8C547', g: '#7CC46B', h: '#146EF5'},
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

// Trophy (Care after launch)
export const TROPHY: Sprite = {
  width: 12,
  height: 12,
  palette: {a: '#E8C547', b: '#FFF6C8', c: '#C49634', d: '#1C2B19'},
  rows: [
    '..aaaaaaaa..',
    'aaabaaaaaaaa',
    'a.abaaaaaa.a',
    'a.aaaaaaaa.a',
    '.aaaaaaaaaa.',
    '..aaaaaaaa..',
    '...aaaaaa...',
    '.....aa.....',
    '.....aa.....',
    '....cccc....',
    '...cccccc...',
    '...dddddd...',
  ],
}
