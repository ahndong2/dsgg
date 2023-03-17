import express, { Request, Response } from "express";
import { Game } from "../models/game.js";

export const gameRouter = express.Router();
gameRouter
  .get("/game", async (req: Request, res: Response) => {
    try {
      const { page = 0 } = req.params;

      const game = await Game.find()
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
      const { userId, userName, point } = req.body;
      if (userId === "" || userName === "" || point === "") {
        return res.status(400).json({
          code: 2,
          error: "EMPTY REQUEST PARAMS",
        });
      }

      let user = new Game({
        blue: req.body.blue,
        red: req.body.red,
        mvp: req.body.mvp,
      });

      // save
      await user.save();
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
  });
