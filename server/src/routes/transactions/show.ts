import express, { Request, Response } from 'express';

import { requireAuth } from '@scxsocialcommon/errors';
import { Transactions } from '../../models/transactions';

const router = express.Router();

router.post('/api/plan', requireAuth, async (req: Request, res: Response) => {
    const transactions = Transactions.find({ userId: req.currentUser?.userId! });

    res.status(201).send({ transactions });
});

export { router as showTransactionsRouter };
