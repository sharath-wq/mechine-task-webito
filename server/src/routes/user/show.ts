import express, { Request, Response } from 'express';

import { User } from '../../models/user';
import { requireAuth } from '@scxsocialcommon/errors';

const router = express.Router();

router.get('/api/users/user', requireAuth, async (req: Request, res: Response) => {
    const { id } = req.body;

    const user = User.findById(id);

    res.status(201).send({ user });
});

export { router as showUserRouter };
