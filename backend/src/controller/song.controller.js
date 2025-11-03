import { Song } from "../models/song.model.js";
import client from "../lib/redis.js";
export const getAllSongs = async (req, res, next) => {
	try {
		// -1 = Descending => newest -> oldest
		// 1 = Ascending => oldest -> newest
		const songs = await Song.find().sort({ createdAt: -1 });
		res.json(songs);
	} catch (error) {
		next(error);
	}
};

export const getFeaturedSongs = async (req, res, next) => {
	try {
		const cacheKey = 'featured_songs';
		const cachedData = await client.get(cacheKey);
		if (cachedData) {
			console.log("from cache");
			return res.json(JSON.parse(cachedData));
		}

		// fetch 6 random songs using mongodb's aggregation pipeline
		const songs = await Song.aggregate([
			{
				$sample: { size: 6 },
			},
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1,
				},
			},
		]);
		await client.setEx(cacheKey, 1200, JSON.stringify(songs)); //cache for 1 hour
		

		res.json(songs);
	} catch (error) {
		next(error);
	}
};

export const getMadeForYouSongs = async (req, res, next) => {
	try {
		const cacheKey = 'made_for_you_songs';
		const cachedData = await client.get(cacheKey);
		if(cachedData) {
			return res.json(JSON.parse(cachedData));
		}
		const songs = await Song.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1,
				},
			},
		]);

		await client.setEx(cacheKey, 1200, JSON.stringify(songs)); //cache for 20 minutes

		res.json(songs);
	} catch (error) {
		next(error);
	}
};



export const searchSongs = async (req, res, next) => {
	try {
		const { q } = req.query;

		if (!q || q.trim() === '') {
			return res.json([]);
		}

		const searchRegex = new RegExp(q.trim(), 'i');


		const songs = await Song.find({
			$or: [
				{ title: { $regex: searchRegex } },
				{ artist: { $regex: searchRegex } }
			]
		}).sort({ createdAt: -1 }).limit(20);

		res.json(songs);
	} catch (error) {
		next(error);
	}
};
