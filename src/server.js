import express from 'express';
import helmet from 'helmet';
import 'dotenv/config';
import cors from 'cors';
import { readFileSync } from 'node:fs';
import swaggerUi from 'swagger-ui-express';
import { logger } from './middleware/logger.js';
import { connectMongoDB } from './db/connectToMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import storyRouter from './routes/storyRoutes.js';
import categoriesRouter from './routes/categoriesRoutes.js';
import userRouter from './routes/usersRoutes.js';
import authRouter from './routes/authRoutes.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';

const app = express();

// {LIBRARIES}

app.use(helmet());

app.use(cors({
  origin: `${process.env.FRONTEND_DOMAIN}`,
  credentials: true,
}));

app.use(logger());

app.use(express.json());

app.use(cookieParser());

const swaggerDocument = JSON.parse(
  readFileSync(new URL('../swagger.json', import.meta.url), 'utf-8'),
);

app.use(
  '/api-docs',
  (req, res, next) => {
    res.removeHeader('Content-Security-Policy');
    next();
  },
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);

// {ROUTES}

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/stories', storyRouter);
app.use('/api/categories', categoriesRouter);

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
