import express, { Request, Response } from "express";
import { Team } from "../models/team.js";

export const userRouter = express.Router();
userRouter
  .get("/team", async (req: Request, res: Response) => {
    try {
      const team = await Team.find().limit(1);
      res.status(200).json(team);
    } catch (error: unknown) {
      res.status(500).json({
        code: 1,
        error: "[SERVER ERROR] GET TEAM",
      });
    }
  })
  .post("/team", async (req: Request, res: Response) => {
    try {
      const { members1, members2 } = req.body;
      if (members1.length === 0 || members2.length === 0) {
        return res.status(400).json({
          code: 2,
          error: "EMPTY REQUEST MEMBERS",
        });
      }

      let team = new Team({
        members1: req.body.members1,
        members2: req.body.members2,
      });

      //save
      await team.save();
      res.status(200).json({ success: true });
    } catch (error: unknown) {
      res.status(500).json({
        code: 1,
        error: "[SERVER ERROR] POST TEAM",
      });
    }
  });
