export interface UserParam {
  userId: String;
  userName?: String;
  point?: Number;
}
export interface USER {
  _id?: String;
  userId: String;
  userName: String;
  point: Number;
}

export interface Team {
  member1: string[];
  member2: string[];
  mvp: string;
}

export interface GameParam {
  page: Number;
}

export interface GameUnitData {
  _id?: String;
  userId: String;
  teamId: String;
  champion: String;
  kill: Number;
  death: Number;
  assist: Number;
  win: Boolean;
}

export interface GameData {
  blue: GameUnitData[];
  red: GameUnitData[];
  win?: String;
  mvp?: String;
}

export interface MVPParam {
  userId: String;
  teamId: String;
  gameId: String;
}
