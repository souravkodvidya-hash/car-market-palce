import { Router } from "express";
import { registerVendor, loginVendor, logoutVendor, refreshAccessTokenVendor } from "../controllers/auth.vendor.controller";
import { validate } from "../middleware/validate.middleware";
import { registerSchema,loginSchema } from "../validations/auth.validations";
const router = Router();


// router.post("/register-vendor",validate(registerSchema), registerUser);
// router.post("/login-vendor",validate(loginSchema), loginUser);
router.post("/register-vendor",registerVendor);
router.post("/login-vendor", loginVendor);
router.post("/logout-vendor", logoutVendor);
router.post("/refresh-vendor", refreshAccessTokenVendor);

export default router;
