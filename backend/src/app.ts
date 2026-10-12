import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Endpoint working",
  });
});

export default app;
