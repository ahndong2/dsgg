interface SummonerInfo {
  name: string;
  champ: string;
  kda: number[];
  rating: number;
  mvp?: boolean;
}
export interface Game {
  [key: string]: {
    win: boolean;
    members: SummonerInfo[];
  };
}

export const sampleRecords = [
  {
    date: "2023-03-17",
    games: [
      {
        blue: {
          win: false,
          members: [
            {
              name: "이전도",
              champ: "블라디미르",
              kda: [6, 5, 10],
              rating: 10,
            },
            {
              name: "이전도",
              champ: "블라디미르",
              kda: [6, 5, 10],
              rating: 10,
            },
            { name: "이전도", champ: "블라디", kda: [6, 5, 10], rating: 10 },
            { name: "이전도", champ: "블라디", kda: [6, 5, 10], rating: 10 },
            { name: "이전도", champ: "블라디", kda: [6, 5, 10], rating: 10 },
          ],
        },
        red: {
          win: true,
          members: [
            { name: "최종원", champ: "블라디", kda: [6, 5, 10], rating: 10 },
            {
              name: "최종원",
              champ: "블라디",
              kda: [6, 5, 10],
              rating: 10,
              mvp: true,
            },
            { name: "ㅊㅁ", champ: "블라디", kda: [6, 5, 10], rating: 10 },
            { name: "ㅊㅁ", champ: "블라디", kda: [6, 5, 10], rating: 10 },
            { name: "ㅂㅂ", champ: "블라디", kda: [6, 5, 10], rating: 10 },
          ],
        },
      },
      {
        blue: {
          win: true,
          members: [
            { name: "이전도", champ: "블라디", kda: [6, 5, 10], rating: 10 },
            { name: "이전도", champ: "블라디", kda: [6, 5, 10], rating: 10 },
            {
              name: "이전도",
              champ: "블라디",
              kda: [6, 5, 10],
              rating: 10,
              mvp: true,
            },
            { name: "이전도", champ: "블라디", kda: [6, 5, 10], rating: 10 },
            { name: "이전도", champ: "블라디", kda: [6, 5, 10], rating: 10 },
          ],
        },
        red: {
          win: false,
          members: [
            { name: "최종원", champ: "블라디", kda: [6, 5, 10], rating: 10 },
            { name: "최종원", champ: "블라디", kda: [6, 5, 10], rating: 10 },
            { name: "ㅊㅁ", champ: "블라디", kda: [6, 5, 10], rating: 10 },
            { name: "ㅊㅁ", champ: "블라디", kda: [6, 5, 10], rating: 10 },
            { name: "ㅂㅂ", champ: "블라디", kda: [6, 5, 10], rating: 10 },
          ],
        },
      },
    ] as Game[],
  },
];
