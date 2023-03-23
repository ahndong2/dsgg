import { Champion } from "@/@types";
import axios, { AxiosResponse } from "axios";

// Champion 조회
export const getChampion = async (param: string): Promise<AxiosResponse> => {
  console.log(param);
  const response = await axios({
    url: "/newJson.json",
    method: "GET",
  });
  console.log(response);
  return response.data.filter((v: Champion) => {
    return v.name.indexOf(param) !== -1 || v.nameEn.indexOf(param) !== -1;
  });
};
