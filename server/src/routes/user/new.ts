import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../../models/user';
import { BadRequestError, validateRequest } from '@scxsocialcommon/errors';

const router = express.Router();

router.post(
    '/api/users/add',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('name').isString().isLength({ min: 3 }).withMessage('Name must be 3 character long'),
        body('userName').isString().isLength({ min: 3 }).withMessage('Name must be 3 character long'),
        body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password, userName, imageUrl, name } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = User.build({ email, imageUrl, name, password, userName });
        await user.save();

        const userJwt = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_KEY!
        );

        req.session = {
            jwt: userJwt,
        };

        res.status(201).send(user);
    }
);

export { router as addUserRouter };
