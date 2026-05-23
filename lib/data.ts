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
