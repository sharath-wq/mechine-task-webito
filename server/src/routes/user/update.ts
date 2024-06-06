import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { User } from '../../models/user';
import { NotAuthorizedError, requireAuth, validateRequest } from '@scxsocialcommon/errors';

const router = express.Router();

router.put(
    '/api/users/edit',
    requireAuth,
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('name').isString().isLength({ min: 3 }).withMessage('Name must be 3 character long'),
        body('userName').isString().isLength({ min: 3 }).withMessage('Name must be 3 character long'),
        body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, userName, imageUrl, name } = req.body;

        const existingUser = User.findOne({ email: email, id: req.currentUser?.userId! });

        if (!existingUser) {
            throw new NotAuthorizedError();
        }

        const updatedUser = User.findOneAndUpdate({ email: email }, { userName: userName, name: name });

        res.status(201).send(updatedUser);
    }
);

export { router as editUserRouter };
