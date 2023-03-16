import {Schema, model, Model} from 'mongoose';


interface DBUser {
  userId: String;
  userName: String;
  createdDate: Date;
  modifiedDate: Date;
}
interface DBUserModel extends Model<DBUser> {}
// 스키마 객체 생성
const UserSchema = new Schema<DBUser>({
	userId: {type: String},
  userName: {type: String},
  createdDate: {
    type: Date,
    default: Date.now // 현재 날짜를 기본값으로 지정
	},
	modifiedDate: {
    type: Date,
    default: Date.now // 현재 날짜를 기본값으로 지정
	}
})

// 모델 생성
export const User = model<DBUser,DBUserModel>('User', UserSchema);