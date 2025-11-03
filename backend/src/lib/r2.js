import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import crypto from "crypto";
import fs from "fs";

dotenv.config();

const r2Client = new S3Client({
	region: "auto",
	endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID,
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
	},
});

export const uploadToR2 = async (file, folder = "") => {
	try {
		const fileExtension = file.name.split('.').pop();
		const fileName = `${folder}${crypto.randomUUID()}.${fileExtension}`;


		const fileBuffer = file.tempFilePath 
			? fs.readFileSync(file.tempFilePath)
			: file.data;

		const command = new PutObjectCommand({
			Bucket: process.env.R2_BUCKET_NAME,
			Key: fileName,
			Body: fileBuffer,
			ContentType: file.mimetype,
			CacheControl: 'public, max-age=31536000',
		});

		await r2Client.send(command);

		const fileUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;
		return fileUrl;
	} catch (error) {
		console.log("Error in uploadToR2", error);
		throw new Error("Error uploading to R2");
	}
};

export default r2Client;