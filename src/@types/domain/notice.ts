export interface Notice {
  id: number;
  title: string;
  createdDate: string;
  createdTime: number[];
}

export interface NoticePopup {
  noticeId: string;
  noticeTitle: string;
  noticeContent: string;
  noticePopupStartDate: number[];
  noticePopupEndDate: number[];
  open?: boolean;
}

export interface NoticeLocalStorage {
  date: string;
  noticeIds: string[];
}
