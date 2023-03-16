import express, { Request, Response } from 'express'; 
import { User } from '../models/user.js';

export const userRouter = express.Router(); 
userRouter.post('/', async (req: Request, res: Response) => {
  if (req.body.userId === "") {
    return res.status(400).json({
      error: "EMPTY USERID",
      code: 2
    });
  }
 
  if (req.body.userName === "") {
    return res.status(400).json({
      error: "EMPTY USERNAME",
      code: 2
    });
  }
 
  let user = new User({
    id : req.body.userId,
    name: req.body.userName,
  });
 
  const addUser = await user.save();
  if(addUser){res.json({ success: true });}
});
