const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./utils/config");
const uploadRoutes = require("./routes/upload.routes");

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", uploadRoutes);

app.listen(process.env.PORT || 5000, () => {
	console.log("Backend server is running!");
});
