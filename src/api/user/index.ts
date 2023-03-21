import { UserParam } from "@/@types";
import { API, AxiosResponse } from "@/api/index-instance";

// User 조회
export const getUser = (params: UserParam): Promise<AxiosResponse> =>
  API.request({
    method: "GET",
    url: `user`,
    params,
  });

// User 등록
export const saveUser = (data: UserParam): Promise<AxiosResponse> =>
  API.request({
    method: "POST",
    url: `user`,
    data,
  });

// User 수정
export const editUser = (data: UserParam): Promise<AxiosResponse> =>
  API.request({
    method: "PUT",
    url: `user/${data.userId}`,
    data,
  });
