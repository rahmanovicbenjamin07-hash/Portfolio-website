// Pixel icons of the About page, transcribed from design-reference/about.html (dynamite + medals: the approved about/about.html): one character per pixel,
// "." = empty, every other character is a colour from the sprite palette. Drawn by PixelSprite.tsx.

export type Sprite = { width: number; height: number; palette: Record<string, string>; rows: string[] }

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
// Dynamite stick (photo reveal); the 7 fuse pixels are drawn separately in DynamitePhoto.tsx
export const DYNAMITE: Sprite = {
  width: 16,
  height: 24,
  palette: {a: '#3A0E0A', b: '#8C9988', c: '#55604F', d: '#F2604A', e: '#D8392C', f: '#9E241B', g: '#E2D0A4', h: '#B9A67C', i: '#F1E3C0', j: '#CDBB92'},
  rows: [
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '......aaaa......',
    '.....abbbca.....',
    '.....adeefa.....',
    '.....adeefa.....',
    '.....adeefa.....',
    '.....adeefa.....',
    '.....agggha.....',
    '.....aiiija.....',
    '.....aiaaja.....',
    '.....aiiija.....',
    '.....agggha.....',
    '.....adeefa.....',
    '.....adeefa.....',
    '.....adeefa.....',
    '.....adeefa.....',
    '.....adeefa.....',
    '......aaaa......',
  ],
}

// Spark at the fuse tip
export const SPARK: Sprite = {
  width: 3,
  height: 3,
  palette: {a: '#FFB23E', b: '#FFF6C8', c: '#E55B4D'},
  rows: [
    '.a.',
    'aba',
    '.c.',
  ],
}

// Medal, blue (Webflow Specialization)
export const MEDAL_BLUE: Sprite = {
  width: 16,
  height: 16,
  palette: {a: '#146EF5', b: '#1C2B19', c: '#FFCF4A', d: '#B8860B'},
  rows: [
    '...aaa....aaa...',
    '...aaa....aaa...',
    '....aaa..aaa....',
    '....aaa..aaa....',
    '.....aaaaaa.....',
    '.....bbbbbb.....',
    '....bbccccbb....',
    '...bcccddcccb...',
    '...bccddddccb...',
    '..bccddddddccb..',
    '..bcccddddcccb..',
    '..bcccdccdcccb..',
    '...bcdccccdcb...',
    '...bccccccccb...',
    '....bbccccbb....',
    '.....bbbbbb.....',
  ],
}

// Medal, green (The Webflow Way)
export const MEDAL_GREEN: Sprite = {
  width: 16,
  height: 16,
  palette: {a: '#2E9E4F', b: '#1C2B19', c: '#E4ECD6'},
  rows: [
    '...aaa....aaa...',
    '...aaa....aaa...',
    '....aaa..aaa....',
    '....aaa..aaa....',
    '.....aaaaaa.....',
    '.....bbbbbb.....',
    '....bbccccbb....',
    '...bccccccccb...',
    '...bccccccacb...',
    '..bccccccaaccb..',
    '..bccaccaacccb..',
    '..bcccaaaccccb..',
    '...bcccaccccb...',
    '...bccccccccb...',
    '....bbccccbb....',
    '.....bbbbbb.....',
  ],
}
