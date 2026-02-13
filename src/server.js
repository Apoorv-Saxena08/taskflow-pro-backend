const app = require("./app");
const { connectDB } = require("./config/db");
const { PORT } = require("./config/env");

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
}

startServer();
