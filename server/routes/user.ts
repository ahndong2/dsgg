import express, { Request, Response } from "express";
import { User } from "../models/user.js";

export const userRouter = express.Router();
userRouter
  .get("/", async (req: Request, res: Response) => {
    try {
      const user = await User.find({ userId: req.params.id });
      res.status(200).json(user);
    } catch (error: unknown) {
      res.status(500).json({
        code: 1,
        error: "ERROR QUERY RESULT",
      });
    }
  })
  .post("/", async (req: Request, res: Response) => {
    const { userId, userName, point } = req.body;
    if (userId === "" || userName === "" || point === "") {
      return res.status(400).json({
        code: 2,
        error: "EMPTY REQUEST PARAMS",
      });
    }

    let user = new User({
      userId: req.body.userId,
      userName: req.body.userName,
      point: req.body.point,
    });

    const addUser = await user.save();
    if (addUser) {
      res.status(200).json({ success: true });
    }
  });
