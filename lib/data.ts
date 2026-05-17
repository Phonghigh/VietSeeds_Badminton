export interface Player {
  id: number;
  name: string;
  nick: string;
  level: number;
  xp: number;
  xpMax: number;
  streak: number;
  wins: number;
  attendance: number;
  role: "admin" | "player";
  achievements?: string[];
}

export interface Court {
  id: string;
  name: string;
  short: string;
  area: string;
  price: number;
}

export interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  court: Court;
  status: "upcoming" | "live" | "past";
  going: number[];
  maybe?: number[];
  notGoing?: number[];
  capacity: number;
  cost: number;
  attendancePct?: number;
  matchesPlayed?: number;
  shuttlesUsed?: number;
}

export interface Achievement {
  id: string;
  name: string;
  desc: string;
  color: string;
  icon: string;
  earned: boolean;
  rarity: "common" | "rare" | "epic" | "legend";
}

export interface Quest {
  id: number;
  label: string;
  xp: number;
  done: boolean;
  progress?: number;
  total?: number;
}

export interface ActivityItem {
  id: number;
  who: number;
  type: "win" | "level" | "vote" | "join" | "badge" | "photo";
  text: string;
  target?: number | null;
  time: string;
  xp?: number;
  level?: number;
}

export const PLAYERS: Player[] = [
  { id: 1,  name: "Minh Nguyễn",   nick: "Minh",   level: 18, xp: 1240, xpMax: 1500, streak: 12, wins: 47, attendance: 92, role: "admin", achievements: ["smash", "streak", "night"] },
  { id: 2,  name: "Hà Trần",       nick: "Hà",     level: 15, xp: 880,  xpMax: 1200, streak: 8,  wins: 31, attendance: 84, role: "player" },
  { id: 3,  name: "Long Phạm",     nick: "Long",   level: 22, xp: 1820, xpMax: 2000, streak: 23, wins: 71, attendance: 96, role: "player", achievements: ["mvp", "smash"] },
  { id: 4,  name: "Linh Bùi",      nick: "Linh",   level: 11, xp: 420,  xpMax: 800,  streak: 4,  wins: 18, attendance: 71, role: "player" },
  { id: 5,  name: "Tuấn Lê",       nick: "Tuấn",   level: 9,  xp: 310,  xpMax: 600,  streak: 2,  wins: 12, attendance: 65, role: "player" },
  { id: 6,  name: "Mai Phan",      nick: "Mai",    level: 14, xp: 760,  xpMax: 1100, streak: 6,  wins: 24, attendance: 78, role: "player" },
  { id: 7,  name: "Quang Đỗ",      nick: "Quang",  level: 17, xp: 1010, xpMax: 1400, streak: 9,  wins: 38, attendance: 88, role: "player" },
  { id: 8,  name: "Phương Vũ",     nick: "Phương", level: 13, xp: 640,  xpMax: 1000, streak: 5,  wins: 22, attendance: 76, role: "player" },
  { id: 9,  name: "Khánh Hoàng",   nick: "Khánh",  level: 20, xp: 1500, xpMax: 1700, streak: 15, wins: 58, attendance: 93, role: "player" },
  { id: 10, name: "An Ngô",        nick: "An",     level: 10, xp: 380,  xpMax: 700,  streak: 3,  wins: 14, attendance: 68, role: "player" },
  { id: 11, name: "Thảo Đặng",     nick: "Thảo",   level: 16, xp: 950,  xpMax: 1300, streak: 7,  wins: 28, attendance: 82, role: "player" },
  { id: 12, name: "Duy Vương",     nick: "Duy",    level: 12, xp: 540,  xpMax: 900,  streak: 4,  wins: 20, attendance: 73, role: "player" },
];

export const ME = PLAYERS[0];

export const COURTS: Court[] = [
  { id: "a", name: "Lý Thường Kiệt Court",  short: "LTK", area: "Q.10", price: 120000 },
  { id: "b", name: "Phú Thọ Sports Center", short: "PT",  area: "Q.11", price: 150000 },
  { id: "c", name: "Nguyễn Tri Phương",     short: "NTP", area: "Q.5",  price: 100000 },
  { id: "d", name: "Tao Đàn Park",          short: "TĐ",  area: "Q.1",  price: 180000 },
];

export const SESSIONS: Session[] = [
  {
    id: "s-25",
    title: "Thursday Night Smash",
    date: "Thu, May 21",
    time: "19:30 – 21:30",
    court: COURTS[0],
    status: "upcoming",
    going: [1, 3, 7, 9, 11, 6, 2],
    maybe: [4, 5],
    notGoing: [10],
    capacity: 12,
    cost: 480000,
  },
  {
    id: "s-24",
    title: "Saturday Doubles Clash",
    date: "Sat, May 16",
    time: "17:00 – 19:00",
    court: COURTS[1],
    status: "live",
    going: [1, 3, 5, 6, 8, 9, 11, 12],
    maybe: [],
    notGoing: [],
    capacity: 12,
    cost: 600000,
    attendancePct: 100,
    matchesPlayed: 7,
    shuttlesUsed: 4,
  },
  {
    id: "s-23",
    title: "Sunday Morning Warm-up",
    date: "Sun, May 10",
    time: "08:00 – 10:00",
    court: COURTS[2],
    status: "past",
    going: [1, 2, 3, 4, 7, 8, 11],
    maybe: [],
    notGoing: [],
    capacity: 12,
    cost: 400000,
    attendancePct: 85,
    shuttlesUsed: 3,
  },
];

export const ACTIVITY: ActivityItem[] = [
  { id: 1, who: 3,  type: "win",   text: "won 21–18 vs",      target: 7,    time: "12m ago", xp: 25 },
  { id: 2, who: 9,  type: "level", text: "leveled up to",     target: null, time: "34m ago", xp: 50, level: 20 },
  { id: 3, who: 1,  type: "vote",  text: "voted for Court A", target: null, time: "1h ago" },
  { id: 4, who: 6,  type: "join",  text: "joined session",    target: null, time: "2h ago" },
  { id: 5, who: 11, type: "badge", text: "earned 🔥 5-streak",target: null, time: "3h ago" },
  { id: 6, who: 2,  type: "photo", text: "shared 3 photos",   target: null, time: "5h ago" },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: "smash",  name: "Smash Master", desc: "50 winning smashes",      color: "#EF4444", icon: "racket", earned: true,  rarity: "rare"   },
  { id: "streak", name: "8-Streak",     desc: "8 sessions in a row",     color: "#FB923C", icon: "fire",   earned: true,  rarity: "common" },
  { id: "night",  name: "Night Owl",    desc: "10 late-night games",     color: "#A78BFA", icon: "star",   earned: true,  rarity: "common" },
  { id: "mvp",    name: "MVP",          desc: "Top scorer of month",     color: "#FACC15", icon: "crown",  earned: false, rarity: "epic"   },
  { id: "iron",   name: "Iron Will",    desc: "20-streak achievement",   color: "#22D3EE", icon: "medal",  earned: false, rarity: "legend" },
  { id: "team",   name: "Team Player",  desc: "Played with 30 partners", color: "#22C55E", icon: "heart",  earned: true,  rarity: "common" },
];

export const QUESTS: Quest[] = [
  { id: 1, label: "Attend tonight's session",   xp: 50, done: false },
  { id: 2, label: "Vote on next week's court",  xp: 20, done: true  },
  { id: 3, label: "Win 3 matches",              xp: 75, done: false, progress: 1, total: 3 },
];

export function findPlayer(id: number): Player {
  return PLAYERS.find((p) => p.id === id) ?? PLAYERS[0];
}
