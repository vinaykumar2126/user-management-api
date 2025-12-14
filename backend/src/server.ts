import "dotenv/config";
import app from "./app";
import connectMongo from "./db/mongo";

const PORT = process.env.PORT || 3000;

// connect to MongoDB
connectMongo();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
