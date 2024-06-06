import express, { Request, Response } from 'express';

import { User } from '../../models/user';
import { NotAuthorizedError, requireAuth } from '@scxsocialcommon/errors';

const router = express.Router();

router.delete('/api/users/delete', requireAuth, async (req: Request, res: Response) => {
    const { id } = req.body;

    const user = User.findById(id);

    if (!user || id !== req.currentUser?.userId!) {
        throw new NotAuthorizedError();
    }

    User.findByIdAndDelete(id);

    res.status(201).send({ status: 'ok' });
});

export { router as deleteUserRouter };
