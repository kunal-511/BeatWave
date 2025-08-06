import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		clerkId: {
			type: String,
			required: true,
			unique: true,
		},
		isPremium: {
			type: Boolean,
			default: false,
		},
		premiumStartDate: {
			type: Date,
			default: null,
		},
		premiumEndDate: {
			type: Date,
			default: null,
		},
		payments: [{
			paymentId: {
				type: String,
				required: true,
			},
			orderId: {
				type: String,
				required: true,
			},
			amount: {
				type: Number,
				required: true,
			},
			currency: {
				type: String,
				default: 'INR',
			},
			status: {
				type: String,
				enum: ['pending', 'completed', 'failed', 'refunded'],
				default: 'pending',
			},
			paymentMethod: {
				type: String,
				default: 'razorpay',
			},
			createdAt: {
				type: Date,
				default: Date.now,
			},
		}],
	},
	{ timestamps: true } 
);

export const User = mongoose.model("User", userSchema);
