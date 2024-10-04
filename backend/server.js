import express from 'express';
import dotenv from 'dotenv';
import router from './routes/index.js';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());


// Use the router
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
