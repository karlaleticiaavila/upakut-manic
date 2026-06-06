import {Router} from "express";
import{
    getCurrentUser,
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/register" , registerUser);
router.post("/login",  loginUser);
router.post("/logout" , logoutUser);
router.get("/me", getCurrentUser);

//router.get("/test", (_req, res) => {
  //res.json({ message: "auth routes working" });
//});
export default router;