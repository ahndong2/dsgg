import { GameParam, GameData, MVPParam } from "@/@types";
import { API, AxiosResponse } from "@/api/index-instance";

// Game 조회
export const getGame = (params: GameParam): Promise<AxiosResponse> =>
  API.request({
    method: "GET",
    url: `game`,
    params,
  });

// Game 등록
export const saveGame = (data: GameData): Promise<AxiosResponse> =>
  API.request({
    method: "POST",
    url: `game`,
    data,
  });

// Mvp 등록
export const updateMvp = (data: MVPParam): Promise<AxiosResponse> =>
  API.request({
    method: "POST",
    url: `game/mvp`,
    data,
  });
