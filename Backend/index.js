const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");

const { connectDB } = require("./utils/feature.util");
const uploadRoutes = require("./routes/video.routes");
const watchParty = require("./routes/watchParty.route");
const user = require("./routes/user.route");

const SocketConnection = require("./socket");
const auth = require("./middlewares/auth.middleware");
const { errorMiddleware } = require("./middlewares/error.middleware");
const server = http.createServer(app);

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

SocketConnection(server);
//routes
app.use("/api/v1/user", user);
app.use(auth);
app.use("/api/v1/videos", uploadRoutes);
app.use("/api/v1/watchparty", watchParty);
app.use(errorMiddleware);

server.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
