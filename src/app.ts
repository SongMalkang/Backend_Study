// app.ts
import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/UserRoutes.ts';
import { sequelize } from './config/database.ts';
import { swaggerUi, swaggerSpec } from './config/swaggerConfig.ts';


const app = express();
const port = process.env.PORT ?? 4790;

app.use(bodyParser.json());
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', userRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

export default app;
