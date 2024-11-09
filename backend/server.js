import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/ToDoRoutes.js";
import connectDB from "./db/conncetDB.js";
import path from "path"; 

dotenv.config();
const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

connectDB()

app.use("/api", routes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
}

app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname, "frontend","dist","index.html"));
})

app.listen(PORT, () => console.log(`Listening at ${PORT}...`));
