/* eslint-disable  @typescript-eslint/no-explicit-any */
export interface ResponseGeneratorUnit {
  content?: any;
  contents?: any;
  httpStatus: number;
  message: string | null;
  processTime: string | null;
  rowCount: number;
  date: string;
  time: string;
}
export interface ResponseGenerator extends Response {
  data: ResponseGeneratorUnit;
}

export interface SearchParamPaging {
  page?: number;
  size?: number;
  offset?: number;
  sort?: 'ASC' | 'DESC';
  totalElements?: number;
}

export interface OCRResponse {
  head: { status: { code: number; msg: string } };
  body: any;
}
