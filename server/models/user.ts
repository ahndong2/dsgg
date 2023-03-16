import { Schema, model, Model } from "mongoose";

export interface DBUser {
  userId: String;
  userName: String;
  point: Number;
  createdDate: Date;
  modifiedDate: Date;
}
interface DBUserModel extends Model<DBUser> {}
// 스키마 객체 생성
const UserSchema = new Schema<DBUser>({
  userId: { type: String, required: true, default: "" },
  userName: { type: String, required: true, default: "" },
  point: { type: Number, required: true, default: 0.0 },
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
});

// 모델 생성
export const User = model<DBUser, DBUserModel>("User", UserSchema);
