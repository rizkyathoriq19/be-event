import express from 'express';
import bodyParser from 'body-parser';
import db from './utils/database';
import router from './routes/api';


async function init() { 
    try {
        const result = await db();
        console.log("database status: ", result);

        const app = express();
        const PORT = 3_000;

        app.use(bodyParser.json());
        app.use('/api', router);
        
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
        
    } catch (error) {
        console.log(error);
    }
}

init();