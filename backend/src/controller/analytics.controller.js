import client from "../lib/redis.js";
import {Song} from "../models/song.model.js"
export const trackSongPlay = async (req, res, next) => {
    try {
        const { songId } = req.params;
        const userId = req.auth?.userId;

        if (!userId || !songId) {
            return res.status(400).json({ error: 'Missing required data' });
        }
        await client.zIncrBy('songs:plays:global', 1, songId);
        await client.zIncrBy(`songs:plays:user:${userId}`, 1, songId);

        const hour = new Date().toISOString().slice(0, 13);
        await client.zIncrBy(`analytics:hourly:${hour}`, 1, songId);

        await client.lpush(`user:${userId}:recent`, songId);
        await client.ltrim(`user:${userId}:recent`, 0, 49);

        res.json({ success: true });
    } catch (error) {
        next(error);
    }
}


export const getTrendingSongs = async (req, res, next) => {
    try {
        const trendingIds = await client.ZRANGE('songs:plays:global', 0, 9);
        console.log("from redis", trendingIds);

        if (trendingIds.length === 0) {
            const songs = await Song.aggregate([{ $sample: { size: 4 } }]);
            return res.json(songs);
        }

        const songs = await Song.find({ _id: { $in: trendingIds } });
        res.json(songs);
    } catch (error) {
        next(error);
    }
};