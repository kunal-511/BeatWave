import { Server } from "socket.io";
import { Message } from "../models/message.model.js";
import client from "./memoryCache.js";

export const initializeSocket = (server) => {
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:3000",
			credentials: true,
		},
	});

	const userSockets = new Map(); // { userId: socketId}
	const userActivities = new Map(); // {userId: activity}

	io.on("connection", (socket) => {
		socket.on("user_connected", async (userId) => {
			await client.hSet('user:sockets', userId, socket.id);
			await client.sAdd('users:online', userId);
			await client.hSet('user:activities', userId, 'Idle');

			// userSockets.set(userId, socket.id);
			// userActivities.set(userId, "Idle");

			// broadcast to all connected sockets that this user just logged in
			io.emit("user_connected", userId);

			const onlineUsers = await client.sMembers('users:online');

			socket.emit("users_online", onlineUsers);
			const activities = await client.hGetAll('user:activities');
			socket.emit("activities", activities);


		});

		socket.on("update_activity", async ({ userId, activity }) => {
			console.log("activity updated", userId, activity);
			//userActivities.set(userId, activity);
			await client.hSet('user:activities', userId, activity);
			io.emit("activity_updated", { userId, activity });
			await client.zIncrBy('analytics:activities', 1, activity);
			
		});

		socket.on("send_message", async (data) => {
			try {
				const { senderId, receiverId, content } = data;

				const message = await Message.create({
					senderId,
					receiverId,
					content,
				});

				// send to receiver in realtime, if they're online
				const receiverSocketId = userSockets.get(receiverId);
				if (receiverSocketId) {
					io.to(receiverSocketId).emit("receive_message", message);
				}

				socket.emit("message_sent", message);
			} catch (error) {
				console.error("Message error:", error);
				socket.emit("message_error", error.message);
			}
		});
		

		socket.on("disconnect", async () => {
			const userSockets = await client.hGetAll('user:sockets');
			
			let disconnectedUserId;
			for (const [userId, socketId] of Object.entries(userSockets)) {
				// find disconnected user
				if (socketId === socket.id) {
					disconnectedUserId = userId;
					await client.hDel('user:sockets', userId);
					await client.sRem('users:online', userId);
					await client.hDel('user:activities', userId);
					break;
				}
			}
			if (disconnectedUserId) {
				io.emit("user_disconnected", disconnectedUserId);
			}
		});
	});
};
