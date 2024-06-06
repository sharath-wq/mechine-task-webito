import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { NotFoundError, currentUser, errorHandler } from '@scxsocialcommon/errors';
import { addUserRouter } from './routes/user/new';
import { editUserRouter } from './routes/user/update';
import { showUserRouter } from './routes/user/show';
import { deleteUserRouter } from './routes/user/delete';
import { planRouter } from './routes/plan/new';
import { newTransactionRouter } from './routes/transactions/new';
import { showTransactionsRouter } from './routes/transactions/show';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
        sameSite: 'none',
    })
);

// user routes
app.use(addUserRouter);
app.use(editUserRouter);
app.use(showUserRouter);
app.use(deleteUserRouter);

// plan routes
app.use(planRouter);

// transactions route
app.use(newTransactionRouter);
app.use(showTransactionsRouter);

app.use(currentUser);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
