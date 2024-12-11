import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getCurrentUser, loginUser, logOutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";

const router =Router();


router.route("/signup").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)

router.route("/refreshToken").post(refreshAccessToken)

router.route("/logout").post(verifyJWT,logOutUser)

router.route("/getCurrentUser").get(verifyJWT,getCurrentUser)


export default router 