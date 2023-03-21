export interface AlarmUnit {
  id: number;
  kind?: 'CONTRACT';
  message: string;
  linkUrl: string;
  linkText: string;
  createDate: string;
  receivers: any;
}
export interface AlarmMessage {
  alarmMessageIds: string;
  readYn: string;
}
