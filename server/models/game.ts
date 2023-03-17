import { Schema, model, Model } from "mongoose";

export interface GameReqModel {
  userId: Schema.Types.ObjectId;
  teamId: Schema.Types.ObjectId;
  champion: String;
  kill: Number;
  death: Number;
  assist: Number;
  win: Boolean;
}
interface Teams {
  members: Array<Schema.Types.ObjectId>;
  win: Boolean;
}
export interface DBGame {
  blue: Teams;
  red: Teams;
  win: String;
  mvp: Schema.Types.ObjectId;
  date: Date;
  createdDate: Date;
  modifiedDate: Date;
}
interface DBGameModel extends Model<DBGame> {}
// 스키마 객체 생성
const GameSchema = new Schema<DBGame>({
  win: { type: String },
  mvp: { type: Schema.Types.ObjectId, ref: "User" },
  blue: {
    camp: { type: String, default: "blue" },
    members: [{ type: Schema.Types.ObjectId, ref: "Team" }],
    win: { type: Boolean },
  },
  red: {
    camp: { type: String, default: "red" },
    members: [{ type: Schema.Types.ObjectId, ref: "Team" }],
    win: { type: Boolean },
  },
  createdDate: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본값으로 지정
  },
  modifiedDate: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본값으로 지정
  },
});

// 모델 생성
export const Game = model<DBGame, DBGameModel>("Game", GameSchema);
