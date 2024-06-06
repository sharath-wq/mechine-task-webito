import express, { Request, Response } from 'express';

import { requireAuth } from '@scxsocialcommon/errors';
import { Transactions } from '../../models/transactions';

const router = express.Router();

router.post('/api/plan', requireAuth, async (req: Request, res: Response) => {
    const { type, amount, userId } = req.body;

    const transaction = Transactions.build({ type, amount, userId });

    res.status(201).send({ transaction });
});

export { router as newTransactionRouter };
