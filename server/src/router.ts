import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) =>
  res.send('Server up and runnning')
);

export default router;
