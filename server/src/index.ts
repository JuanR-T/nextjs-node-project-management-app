
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import projectRoutes from './routes/project.routes';
import searchRoutes from './routes/search.routes';
import taskRoutes from './routes/task.routes';
import teamRoutes from './routes/team.routes';
import userRoutes from './routes/user.routes';

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

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/search", searchRoutes);
app.use("/users", userRoutes);
app.use("/teams", teamRoutes);

// Start server

const port = Number(process.env.PORT || 5000);
app.listen(port,"0.0.0.0", () => {  
    console.log(`Server is running on port ${port}`);
});