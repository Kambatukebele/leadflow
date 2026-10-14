import express from "express";
import cors from "cors";
import { leadRoutes, userRoutes } from "./routes/V1/index";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

//API
app.use("/api/v1", userRoutes);
app.use("/api/v1", leadRoutes);

// Error Handler
app.use(errorHandler);
export default app;
