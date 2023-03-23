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
export interface DBGame {
  blue: Array<Schema.Types.ObjectId>;
  red: Array<Schema.Types.ObjectId>;
  win: String;
  mvp: Schema.Types.ObjectId;
  date: String;
  createdDate: Date;
  modifiedDate: Date;
}
interface DBGameModel extends Model<DBGame> {}
// 스키마 객체 생성
const GameSchema = new Schema<DBGame>({
  date: { type: String },
  win: { type: String },
  mvp: { type: Schema.Types.ObjectId, ref: "User" },
  blue: [{ type: Schema.Types.ObjectId, ref: "UserGameLog" }],
  red: [{ type: Schema.Types.ObjectId, ref: "UserGameLog" }],
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
