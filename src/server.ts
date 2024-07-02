// server.ts
import app from './app';

const PORT = process.env.PORT ?? 4790;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
