
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import projectRoutes from './routes/project.routes';

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// Routes

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use("/projects", projectRoutes)

// Start server

const port = process.env.PORT || 5000;
app.listen(port, () => {  
    console.log(`Server is running on port ${port}`);
});