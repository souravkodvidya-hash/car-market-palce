import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken } from "../controllers/auth.user";
import { validate } from "../middleware/validate.middleware";
import { registerSchema,loginSchema } from "../validations/auth.validations";
const router = Router();


router.post("/register",validate(registerSchema), registerUser);
router.post("/login",validate(loginSchema), loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshAccessToken);

export default router;
