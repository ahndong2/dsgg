import { Schema, model, Model } from "mongoose";

export interface DBUserGameLog {
  userId: Schema.Types.ObjectId;
  teamId: Schema.Types.ObjectId;
  champion: String;
  position: String;
  kill: Number;
  death: Number;
  assist: Number;
  win: Boolean;
  mvp: Boolean;
  createdDate: Date;
  modifiedDate: Date;
}
interface DBUserGameLogModel extends Model<DBUserGameLog> {}
// 스키마 객체 생성
const UserGameLogSchema = new Schema<DBUserGameLog>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  teamId: { type: Schema.Types.ObjectId, ref: "Team" },
  champion: { type: String },
  position: { type: String },
  kill: { type: Number, default: 0 },
  death: { type: Number, default: 0 },
  assist: { type: Number, default: 0 },
  win: { type: Boolean, default: false },
  mvp: { type: Boolean, default: false },
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
