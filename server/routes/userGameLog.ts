import express, { Request, Response } from "express";
import { UserGameLog } from "../models/userGameLog.js";

export const userGameLog = express.Router();
userGameLog
  .get("/userGameLog", async (req: Request, res: Response) => {
    try {
      const game = await UserGameLog.find();
      res.status(200).json(game);
    } catch (error: unknown) {
      res.status(500).json({
        code: 1,
        error: "[SERVER ERROR] GET GAME",
      });
    }
  })
  .post("/userGameLog", async (req: Request, res: Response) => {
    try {
      const { userId, userName, point } = req.body;
      if (userId === "" || userName === "" || point === "") {
        return res.status(400).json({
          code: 2,
          error: "EMPTY REQUEST PARAMS",
        });
      }

      let user = new UserGameLog({
        teamId: req.body.teamId,
        gameId: req.body.gameId,
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
  });
