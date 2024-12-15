import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './src/db/index.js';
import todosRoutes from './src/routes/todos.routes.js';
import cors from 'cors';


const app = express();

var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use('/api/v1', todosRoutes);

app.get('/', (req, res) => {
  res.send('Hello World! Why you are available?');
});

// Connect to Database and Start Server
connectDB()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`⚙️  Server is running at port: ${port}`);
    });
  })
  .catch((err) => {
    console.error('MONGO DB connection failed !!!', err.message);
    process.exit(1); // Exit the process on database connection failure
  });
