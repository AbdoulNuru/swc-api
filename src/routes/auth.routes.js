import { Router } from "express";
import auth from "../controllers/authController";
import validations from "../middlewares/authValidation";

const router = Router();
const {
  checkFirstName,
  checkLastName,
  checkValidEmail,
  checkPassword,
  checkExistingAccount,
  checkEmail,
  checkValidPassword,
  validateResult,
} = validations;

router.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "You are welcome to Strong Women Corner",
  });
});

router.post(
  "/signup",
  [
    checkFirstName,
    checkLastName,
    checkValidEmail,
    checkPassword,
    checkExistingAccount,
    validateResult,
  ],
  auth.Signup
);
router.post(
  "/login",
  [checkEmail, checkValidPassword, validateResult],
  auth.Login
);

export default router;
