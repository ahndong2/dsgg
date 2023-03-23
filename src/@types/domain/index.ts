export interface UserParam {
  userId: string;
  userName?: string;
  point?: number;
}
export interface USER {
  _id?: string;
  userId: string;
  userName: string;
  point: number;
}

export interface Team {
  member1: string[];
  member2: string[];
  mvp: string;
}

export interface GameParam {
  page: number;
}

export interface GameUnitData {
  _id?: string;
  userId: string;
  teamId: string;
  champion: string;
  kill: number;
  death: number;
  assist: number;
  win: boolean;
}

export interface GameData {
  blue: GameUnitData[];
  red: GameUnitData[];
  win?: string;
  mvp?: string;
}

export interface MVPParam {
  userId: string;
  teamId: string;
  gameId: string;
}

export interface Champion {
  id: number;
  nameEn: string;
  name: string;
  img: string;
  title: string;
  tag: string[];
}
