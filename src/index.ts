import express from 'express';
import router from './routes/api';

const app = express();
const PORT = 3_000;

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});