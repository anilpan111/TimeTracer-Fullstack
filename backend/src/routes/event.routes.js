import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addEvent, loadEvents, loadOneEvent, resetDuration } from "../controllers/event.controller.js";


const router = Router();

router.route("/loadEvents").get(verifyJWT,loadEvents);

router.route("/addEvent").post(verifyJWT,addEvent);

router.route("/loadOneEvent").post(verifyJWT,loadOneEvent)

router.route("/resetDuration").post(verifyJWT,resetDuration)


export default router