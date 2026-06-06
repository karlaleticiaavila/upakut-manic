import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import dotoenv from "dotenv";
dotoenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_KEY || "fallback-secret-key"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.get("/", (_req, res) => {
  res.json({ message: "UPAKUT API is running" });
});

app.use("/users", authRoutes);
app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});