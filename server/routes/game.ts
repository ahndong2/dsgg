import express, { Request, Response } from "express";
import { Game } from "../models/game.js";

export const gameRouter = express.Router();
// gameRouter
// 	.get('/', async (req: Request, res: Response) => {
// 		const addUser = await user.save();
// 		if(addUser){res.json({ success: true });}
// 	})
// 	.post('/', async (req: Request, res: Response) => {
// 			let user = new Game({
// 				id : req.body.userId,
// 				name: req.body.userName,
// 			});

// 			const addUser = await user.save();
// 			if(addUser){res.json({ success: true });}
//   });
