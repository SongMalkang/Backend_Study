// app.ts
import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/UserRoutes.ts';
import menuRoutes from './routes/MenuRoutes.ts';
import sequelize from './config/database.ts';
import { swaggerUi, swaggerSpec } from './config/swaggerConfig.ts';

const app = express();
const port = process.env.PORT ?? 4790;

app.use(bodyParser.json());
app.use('/document', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/user', userRoutes);
app.use('/menu', menuRoutes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

export default app;
