const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./utils/feature.util");
const uploadRoutes = require("./routes/video.routes");

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/v1/videos", uploadRoutes);

app.listen(process.env.PORT || 5000, () => {
	console.log("Backend server is running!");
});
