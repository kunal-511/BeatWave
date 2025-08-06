import { Router } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";

import { protectRoute } from "../middleware/auth.middleware.js";
import { User } from "../models/user.model.js";

const router = Router();

const razorpayInstance = new Razorpay({ 
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_zOhpl2KPINrq20', 
    key_secret: process.env.RAZORPAY_KEY_SECRET || '05kRpC9bdgvFeZIqURA62jXz'
});



router.post("/create-order", protectRoute, async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const userId = req.auth.userId;


        const receiptId = `order_${userId}`;

        const options = {
            amount: Math.round(amount * 100), 
            currency: currency || "INR",
            receipt: receiptId,
            notes: {
                userId: userId,
                purpose: "BeatWave Premium Subscription"
            }
        };

        const order = await razorpayInstance.orders.create(options);
        console.log("Order created:", order.id, "for user:", userId);
        
        return res.status(200).json({
            id: order.id,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt
        });
    } catch (err) {
        console.error("Error creating Razorpay order:", err);
        return res.status(500).json({ 
            error: "Failed to create order",
            details: process.env.NODE_ENV === "development" ? err.message : undefined
        });
    }
});

router.post("/verify-payment", protectRoute, async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const userId = req.auth.userId;
        
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            
            console.log("Payment verified successfully:", razorpay_payment_id, "for user:", userId);
            

            let user = await User.findOne({ clerkId: userId });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            const premiumStartDate = new Date();
            const premiumEndDate = new Date();
            premiumEndDate.setMonth(premiumEndDate.getMonth() + 1);


            user.isPremium = true;
            user.premiumStartDate = premiumStartDate;
            user.premiumEndDate = premiumEndDate;


            user.payments.push({
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id,
                amount: 200,
                currency: 'INR',
                status: 'completed',
                paymentMethod: 'razorpay',
            });

            await user.save();

            console.log("User premium status updated for:", userId);
            res.status(200).json({ 
                status: "success", 
                message: "Payment verified and premium activated",
                premiumEndDate: premiumEndDate
            });
        } else {

            console.log("Payment verification failed for user:", userId, "Payment ID:", razorpay_payment_id);
            

            let user = await User.findOne({ clerkId: userId });
            if (user) {
                user.payments.push({
                    paymentId: razorpay_payment_id,
                    orderId: razorpay_order_id,
                    amount: 200,
                    currency: 'INR',
                    status: 'failed',
                    paymentMethod: 'razorpay',
                });
                await user.save();
            }

            res.status(400).json({ status: "failure", message: "Payment verification failed" });
        }
    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({ error: "Payment verification failed" });
    }
});

router.get("/premium-status", protectRoute, async (req, res) => {
    try {
        const userId = req.auth.userId;
        const user = await User.findOne({ clerkId: userId });
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const now = new Date();
        const isPremiumValid = user.isPremium && user.premiumEndDate && user.premiumEndDate > now;

        if (user.isPremium && !isPremiumValid) {
            user.isPremium = false;
            await user.save();
        }

        res.status(200).json({
            isPremium: isPremiumValid,
            premiumStartDate: user.premiumStartDate,
            premiumEndDate: user.premiumEndDate,
            paymentsCount: user.payments.length
        });
    } catch (error) {
        console.error("Error fetching premium status:", error);
        res.status(500).json({ error: "Failed to fetch premium status" });
    }
});


export default router;
