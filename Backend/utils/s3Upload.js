const { s3 } = require("./feature.util");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

const uploadToS3 = async (file, folder) => {
	try {
		if (!file || !file.buffer) {
			throw new Error("Invalid file input");
		}

		const fileName = `${folder}/${Date.now()}-${file.originalname}`;
		const bucketName = process.env.S3_BUCKET_NAME || "";
		const cloudfrontDomain = process.env.CLOUDFRONT_DOMAIN || "";

		const uploadParams = {
			Bucket: bucketName,
			Key: fileName,
			Body: file.buffer,
			ContentType: file.mimetype,
		};

		await s3.send(new PutObjectCommand(uploadParams));

		return `${cloudfrontDomain}/${encodeURIComponent(fileName)}`;
	} catch (error) {
		console.error("S3 Upload Error:", error);
		throw new Error("Failed to upload file to S3");
	}
};

module.exports = { uploadToS3 };
