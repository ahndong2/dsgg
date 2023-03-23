import express, { Request, Response } from "express";
import { Game, GameReqModel } from "../models/game.js";
import { UserGameLog } from "../models/userGameLog.js";

const getMember = (data: GameReqModel[]) => {
  return Promise.all(
    data.map(async (v: GameReqModel) => {
      const userGameLog = new UserGameLog({
        ...v,
      });
      const userGameLogRow = await userGameLog.save();

      return userGameLogRow._id;
    })
  );
};

export const gameRouter = express.Router();
gameRouter
  .get("/game", async (req: Request, res: Response) => {
    try {
      const { page } = req.query;
      const limit = 20;
      console.log(limit, page, (Number(page) - 1) * limit);
      const game = await Game.find()
        .populate(["blue", "red", "mvp"])
        .skip((Number(page ? page : 1) - 1) * limit)
        .limit(limit);

      res.status(200).json(game);
    } catch (error: unknown) {
      console.log(error);
      res.status(500).json({
        code: 1,
        error: "[SERVER ERROR] GET GAME",
      });
    }
  })
  .post("/game", async (req: Request, res: Response) => {
    try {
      const { date, blue, red, mvp, win } = req.body;
      if (blue.length === 0 || red.length === 0) {
        return res.status(400).json({
          code: 2,
          error: "EMPTY REQUEST PARAMS",
        });
      }

      const blueTeam = await getMember(blue);
      const redTeam = await getMember(red);
      const gameData = await {
        date: date,
        blue: blueTeam,
        red: redTeam,
        mvp: mvp,
        win: win ? win : blue[0].win ? "blue" : "red",
      };
      let game = await new Game(gameData);
      // game save
      await game.save();

      res.status(200).json({ success: true });
    } catch (error: unknown) {
      res.status(500).json({
        code: 1,
        error: "[SERVER ERROR] POST USER",
      });
    }
  })
  .put("/game:id", async (req: Request, res: Response) => {
    try {
      if (!req.body) {
        return res.status(400).json({
          message: "Data is empty!",
        });
      }

      // update
      const gameId = req.params.id;
      // await Game.findByIdAndUpdate(gameId, req.body, {
      //   useFindAndModify: false,
      // });
      await Game.updateOne({ _id: gameId }, req.body, {
        useFindAndModify: false,
      });
      res.status(200).json({ success: true });
    } catch (error: unknown) {
      res.status(500).json({
        code: 1,
        error: "[SERVER ERROR] PUT USER",
      });
    }
  })
  .post("/game/mvp", async (req: Request, res: Response) => {
    try {
      const { userId, teamId, gameId } = req.body;
      if (!userId || !teamId || !gameId) {
        return res.status(400).json({
          message: "Data is empty!",
        });
      }

      const userGameLog = await UserGameLog.find({ userId, teamId, gameId });
      userGameLog[0].mvp = true;
      userGameLog[0].save();

      res.status(200).json({ success: true });
    } catch (error: unknown) {
      res.status(500).json({
        code: 1,
        error: "[SERVER ERROR] PUT USER",
      });
    }
  });
