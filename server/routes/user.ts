import express, { Request, Response } from "express";
import { User } from "../models/user.js";

export const userRouter = express.Router();
userRouter
  .get("/user", async (req: Request, res: Response) => {
    try {
      const { userId } = req.query;
      const filter = userId ? { userId: userId } : {};

      const user = await User.find(filter);
      res.status(200).json(user);
    } catch (error: unknown) {
      res.status(500).json({
        code: 1,
        error: "[SERVER ERROR] GET USER",
      });
    }
  })
  .post("/user", async (req: Request, res: Response) => {
    try {
      const { userId, userName, point } = req.body;
      console.log({ userId, userName, point });
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
  .put("/user/:id", async (req: Request, res: Response) => {
    try {
      if (!req.body) {
        return res.status(400).json({
          message: "Data is empty!",
        });
      }

      // update
      const id = req.params.id;
      // await User.findByIdAndUpdate(id, req.body, {
      //   useFindAndModify: false,
      // });
      await User.updateOne({ _id: id }, req.body, {
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
