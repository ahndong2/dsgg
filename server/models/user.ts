const mongoose = require('mongoose');

const { Schema } = mongoose;

// 스키마 객체 생성
const UserSchema = new Schema({
	userId: String,
  userName: String,
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
const User = mongoose.model('User', UserSchema);
export default User