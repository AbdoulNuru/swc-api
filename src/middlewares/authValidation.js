import { body, validationResult } from "express-validator";
import Models from "../database/models";

const { User } = Models;

// signup validations

const checkFirstName = [
  body("firstName")
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage("Please provide your firstname"),
];
const checkLastName = [
  body("lastName")
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage("Please provide your lastname"),
];
const checkValidEmail = [
  body("email")
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage("Please provide your email address")
    .bail()
    .isEmail()
    .withMessage("Please use a valid email address"),
];
const checkPassword = [
  body("password")
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage("Provide your password")
    .bail()
    .isAlphanumeric()
    .withMessage("The password must contain letters and numbers")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      "The Password must contain at least one capital letter, one lowercase letter and a symbol"
    ),
];
const checkExistingAccount = [
  body("email", "account_exist").custom((value = "") =>
    User.findOne({
      where: {
        email: value,
      },
    }).then((user) => {
      if (user !== null) {
        return Promise.reject();
      }
      return true;
    })
  ),
];

// Login validations

const checkEmail = [
  body("email")
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage("Enter your email")
    .bail()
    .isEmail()
    .withMessage("Please use a valid email address"),
];
const checkValidPassword = [
  body("password")
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage("Your password is required"),
];

/**
 * @description this method validate user info
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} res
 * @memberof validateArray
 */
const validateResult = (req, res, next) => {
  const result = validationResult(req);
  const { lang } = req.query;

  if (result.isEmpty()) {
    return next();
  }
  const { errors } = result;

  const errorMessageArr = errors.map((el) => el.msg);

  return res.status(422).json({
    status: 422,
    error: errorMessageArr,
  });
};

export default {
  checkFirstName,
  checkLastName,
  checkValidEmail,
  checkPassword,
  checkExistingAccount,
  checkEmail,
  checkValidPassword,
  validateResult,
};
