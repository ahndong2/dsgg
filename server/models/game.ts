import { ObjectId } from 'mongodb';
import {Schema, model, Model} from 'mongoose';

interface Teams {
	team: ObjectId;
	win: Boolean;
}
export interface DBGame {
	blue: Teams;
	red: Teams;
	date: Date;
  createdDate: Date;
  modifiedDate: Date;
}
interface DBGameModel extends Model<DBGame> {}
// 스키마 객체 생성
const GameSchema = new Schema<DBGame>({
	blue: {type: Object},
	red: {type: Object},
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
export const Game = model<DBGame,DBGameModel>('Game', GameSchema);