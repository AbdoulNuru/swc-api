import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { Op } from "sequelize";
import Models from "../database/models";
import { encode } from "../utils/jwtGenerator";

const { User, Post, Opportunities } = Models;

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
      fieldOfExpertise: fieldOfExpertise.toLowerCase(),
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

const updateProfile = async (req, res) => {
  try {
    const { id } = req.query,
      user = req.body,
      existingUser = await User.findOne({ where: { id } });

    if (!existingUser) {
      return res.status(404).json({
        status: 404,
        error: "No user found with the given id",
      });
    }

    await User.update({ ...user }, { where: { id } });

    return res.status(200).json({
      status: 200,
      message: "Profile updated",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();

    return res.status(200).json({
      status: 200,
      message: "Users retrieved successfully",
      data: allUsers,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.query,
      user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({
        status: 404,
        error: "No user found with the given id",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "User's info retrieved",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};

const getRecommendations = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findOne({ where: { id } });
    const recommended = await User.findAll({
      where: {
        [Op.not]: [{ id: user.id }],
        fieldOfExpertise: user.fieldOfExpertise,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "User recommendations",
      data: recommended,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};

const createPost = async (req, res) => {
  try {
    const {
      body: { article, posterId },
      files: { file },
    } = req;

    if (req.files === null) {
      return res.status(400).json({
        status: 400,
        error: "no file uploaded",
      });
    }

    const newPost = await Post.create({
      id: uuid(),
      posterId,
      article,
      media: file.name,
    });

    file.mv(
      `C:/Users/David Edgard/Desktop/local-images/${file.name}`,
      (err) => {
        if (err) {
          // console.error(err);
          return res.status(500).send(err);
        }
      }
    );

    return res.status(201).json({
      status: 201,
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const { id } = req.query;
    const post = await Post.findAll({ where: { posterId: id } });

    return res.status(200).json({
      status: 200,
      message: "Posts retrieved",
      data: post,
      postCount: post.length
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};

const getUsersByFieldofExpertese = async (req, res) => {
  try {
    const { body: { field } } = req;
    const expertUsers = await User.findAll({
      where: {
        fieldOfExpertise: {
          [Op.like]: `%${field}%`
        }
      },
      attributes: {
        exclude: ['password']
      }
    });
    return res.status(200).json({
      status: 200,
      message: "Users retrieved by expertise",
      data: { expertUsers, count: expertUsers.length },
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};

const createOpportunity = async (req, res) => {
  try {
    const { body: { title, fieldNeeded, company, date, posterId } } = req;
    const createdOpportunity = await Opportunities.create({
      id: uuid(),
      title,
      fieldNeeded,
      company,
      posterId,
      date,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return res.status(201).json({
      status: 201,
      message: "Opportunity created successfully",
      data: createdOpportunity,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};

export default {
  Signup,
  Login,
  updateProfile,
  getUsers,
  getUserById,
  getRecommendations,
  getPosts,
  createPost,
  getUsersByFieldofExpertese,
  createOpportunity
};
