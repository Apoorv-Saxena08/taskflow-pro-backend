const app = require("./app");
const { connectDB } = require("./config/db");
const { PORT } = require("./config/env");
import mongoSanitize from "express-mongo-sanitize";

app.use(mongoSanitize());

app.use(
  mongoSanitize({
    replaceWith: "_",
    allowDots: true
  })
);


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
