import express, { Request, Response } from "express";
import { Game, GameReqModel } from "../models/game.js";
import { UserGameLog } from "../models/userGameLog.js";

export const gameRouter = express.Router();
gameRouter
  .get("/game", async (req: Request, res: Response) => {
    try {
      const { page = 1 } = req.params;

      const game = await Game.find()
        .populate("userGameLog")
        .limit(20)
        .skip(Number(page) * 20);
      res.status(200).json(game);
    } catch (error: unknown) {
      res.status(500).json({
        code: 1,
        error: "[SERVER ERROR] GET GAME",
      });
    }
  })
  .post("/game", async (req: Request, res: Response) => {
    try {
      const { blue, red } = req.body;
      if (blue.length === 0 || red.length === 0) {
        return res.status(400).json({
          code: 2,
          error: "EMPTY REQUEST PARAMS",
        });
      }

      let game = new Game({
        blue: req.body.blue.map((v: GameReqModel) => v.userId),
        red: req.body.blue.map((v: GameReqModel) => v.userId),
        mvp: req.body.mvp,
        win: req.body.win,
      });

      // game save
      const result = await game.save();
      const { _id } = result;
      const userGameLogList = req.body.blue.map((v: GameReqModel) => {
        return {
          ...v,
          gameId: _id,
        };
      });
      await UserGameLog.insertMany(userGameLogList, { ordered: false });

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
