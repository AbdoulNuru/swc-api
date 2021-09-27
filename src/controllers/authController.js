import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { Op } from "sequelize";
import Models from "../database/models";
import { encode } from "../utils/jwtGenerator";

const { User } = Models;

/**
 *@description this is the function that will be used to create a new user
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
const Signup = async (req, res) => {
  try {
    const {
      body: {
        firstName,
        lastName,
        email,
        password,
        fieldOfExpertise,
        skills,
        interests,
      },
      hashedPaswword = bcrypt.hashSync(password, 10),
    } = req;
    const newAccount = await User.create({
      id: uuid(),
      firstName,
      lastName,
      email,
      password: hashedPaswword,
      fieldOfExpertise,
      skills,
      interests,
    });

    return res.status(201).json({
      status: 201,
      message: "Account created successfully",
      data: newAccount,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};

/**
 *@description this is the function that will be used to login
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
const Login = async (req, res) => {
  try {
    const {
      body: { email, password },
    } = req;
    const registeredUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!registeredUser) {
      return res.status(404).json({
        status: 404,
        error: "You don't have an account",
      });
    }

    const correctPassword = await bcrypt.compareSync(
      password,
      registeredUser.password
    );

    if (!correctPassword) {
      return res.status(401).json({
        status: 401,
        error: "Invalid Credentials",
      });
    }

    const token = await encode({ email });

    return res.status(200).json({
      status: 200,
      message: "Successful login",
      data: {
        id: registeredUser.id,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        email,
        fieldOfExpertise: registeredUser.fieldOfExpertise,
        skills: registeredUser.skills,
        interests: registeredUser.interests,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};

export default { Signup, Login };
