import express from "express";
import HttpError from "./middleware/export.js";
import studentRoutes from "./routes/studentRoutes.js";
import connectDB from "./config/db.js";

const app = express();

const port = 5000;

app.use(express.json());

// routes
app.use("/student", studentRoutes);

app.get("/", (req, res) => {
  res.json({ message: "hello from server" });
});

// undefined routes
app.use((req, res, next) => {
  next(new HttpError("requested route not found", 404));
});

// centralized error
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "internal server error",
  });
});

async function startServer() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();