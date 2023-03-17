import { Schema, model, Model } from "mongoose";

export interface DBUserGameLog {
  teamId: Schema.Types.ObjectId;
  gameId: Schema.Types.ObjectId;
  champion: String;
  position: String;
  kill: Number;
  death: Number;
  Assist: Number;
  win: Boolean;
  mvp: Boolean;
  createdDate: Date;
  modifiedDate: Date;
}
interface DBUserGameLogModel extends Model<DBUserGameLog> {}
// 스키마 객체 생성
const UserGameLogSchema = new Schema<DBUserGameLog>({
  teamId: { type: Schema.Types.ObjectId, ref: "team" },
  gameId: { type: Schema.Types.ObjectId, ref: "game" },
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
export const UserGameLog = model<DBUserGameLog, DBUserGameLogModel>(
  "UserGameLog",
  UserGameLogSchema
);
