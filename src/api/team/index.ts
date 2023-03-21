import { Team } from "@/@types";
import { API, AxiosResponse } from "@/api/index-instance";

// Team 조회
export const getTeam = (params: Team): Promise<AxiosResponse> =>
  API.request({
    method: "GET",
    url: `team`,
    params,
  });

// Team 등록
export const saveTeam = (data: Team): Promise<AxiosResponse> =>
  API.request({
    method: "POST",
    url: `team`,
    data,
  });
