import { ObjectId } from "mongodb";
import { Schema, model, Model } from "mongoose";

export interface DBTeam {
  members1: Array<ObjectId>;
  members2: Array<ObjectId>;
  createdDate: Date;
  modifiedDate: Date;
}
interface DBTeamModel extends Model<DBTeam> {}
// 스키마 객체 생성
const TeamSchema = new Schema<DBTeam>({
  members1: { type: [ObjectId] },
  members2: { type: [ObjectId] },
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
export const Team = model<DBTeam, DBTeamModel>("Team", TeamSchema);
