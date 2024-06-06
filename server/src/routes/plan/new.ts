import express, { Request, Response } from 'express';

import { requireAuth } from '@scxsocialcommon/errors';
import { Plan } from '../../models/plan';

const router = express.Router();

router.post('/api/plan', requireAuth, async (req: Request, res: Response) => {
    const { name, amount, userId } = req.body;

    const plan = Plan.build({ amount, name, userId });

    res.status(201).send({ plan });
});

export { router as planRouter };
