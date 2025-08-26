import { Router } from "express";
import { trackSongPlay, getTrendingSongs } from "../controller/analytics.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/track-play/:songId", protectRoute, trackSongPlay);
router.get("/trending", getTrendingSongs);

export default router;