const mongoose = require("mongoose");

const connectDB = (uri) => {
	mongoose
		.connect(uri, { dbName: "Velora" })
		.then((data) => console.log(`Connected to DB: ${data.connection.host}`))
		.catch((err) => {
			throw err;
		});
};
class ErrorHandler extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
	}
}

module.exports = { ErrorHandler, connectDB };
