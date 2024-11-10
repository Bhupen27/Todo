import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/ToDoRoutes.js";
import connectDB from "./db/conncetDB.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

connectDB()

app.use("/api", routes);


app.listen(PORT, () => console.log(`Listening at ${PORT}...`));
