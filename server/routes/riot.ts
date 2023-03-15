import express, { Request, Response } from 'express'; 

export const riotRoute = express.Router(); 
riotRoute.get('/riot', (req: Request, res: Response) => {
res.send('hi');
});
 