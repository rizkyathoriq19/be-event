import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/api';

const app = express();
const PORT = 3_000;

app.use(bodyParser.json());
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});