import express from 'express'
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import { PORT } from "./config.js";

const app = express();
app.use(express.json());

app.use("/user", userRoutes)
app.use("/notes", noteRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})