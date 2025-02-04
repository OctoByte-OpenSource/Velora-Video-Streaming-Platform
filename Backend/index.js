const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./utils/feature.utility");

dotenv.config();

connectDB(process.env.MONGO_URL);

app.get("/", (req, res) => {
	res.send("Backend server is running!");
});

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || 5000, () => {
	console.log("Backend server is running!");
});
