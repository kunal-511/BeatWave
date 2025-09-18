import { Album } from "../models/album.model.js";
import client from "../lib/memoryCache.js";

export const getAllAlbums = async (req, res, next) => {

	const cacheKey = 'all_albums';
	const cachedData = await client.get(cacheKey);
	if (cachedData) {
		console.log("from cache");
		return res.json(JSON.parse(cachedData));
	}


	try {
		const albums = await Album.find();
		res.status(200).json(albums);
		await client.setEx(cacheKey, 1200, JSON.stringify(albums)); 

	} catch (error) {
		next(error);
	}
};

export const getAlbumById = async (req, res, next) => {
	try {
		const { albumId } = req.params;
		if (!albumId) {
			return res.status(400).json({ message: "Album ID is required" });
		}
		const cacheKey = `album:${albumId}`;
		const cachedData = await client.get(cacheKey);
		if (cachedData) {
			console.log("from cache");
			return res.json(JSON.parse(cachedData));
		}

		const album = await Album.findById(albumId).populate("songs");
		await client.setEx(cacheKey, 1200, JSON.stringify(album));

		if (!album) {
			return res.status(404).json({ message: "Album not found" });
		}

		res.status(200).json(album);
	} catch (error) {
		next(error);
	}
};
