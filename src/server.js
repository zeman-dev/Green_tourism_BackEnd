import express from 'express';
import helmet from 'helmet';
import 'dotenv/config';
import cors from 'cors';
import { logger } from './middlewares/logger.js';
import { connectMongoDB } from './db/connectToMongoDB.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import storyRouter from './routes/storyRoutes.js';
import categoriesRouter from './routes/categoriesRoutes.js';
import userRouter from './routes/usersRoutes.js';
import authRouter from './routes/authRoutes.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';

const app = express();

// {LIBRARIES}

app.use(helmet());

app.use(cors());

app.use(logger());

app.use(express.json());

app.use(cookieParser());
// {ROUTES}

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/stories', storyRouter);

// {ERROR MIDDLEWARE}

app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

// {CONNECTION TO DB}

await connectMongoDB();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT=${PORT}`);
});
