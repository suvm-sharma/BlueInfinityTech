const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

const signToken = function (id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    // SEND RESPONSE
    res.status(201).json({
      status: 'Success',
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      res.status(400).json({
        status: 'fail',
        message: 'please provide a valid email or password !!',
      });
    }
    // Check if user exists && password is correct
    const user = await User.findOne({ email: email }).select('+password');

    // if user doesn't exist then user.correctPassword is gonna run but if user exist then it will run this code & check password is actually right and if password is correct we will jump to token
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw Error('Incorrect email or password');
    }

    // if everything is ok, send token to client
    const token = signToken(user._id);
    res.status(200).json({
      status: 'Success',
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getUserDetail = async (req, res) => {
  try {
    // Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // if token will not send along with req, this Error will trigger
    if (!token) {
      throw Error('You are not logged in! please login to get access');
    }

    // 2) Verification token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const freshUser = await User.find({ _id: decoded.id });

    if (!freshUser) {
      throw Error('The user belonging to this token does no longer exist');
    }

    res.status(200).json({
      status: 'Success',
      data: freshUser[0],
    });
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: error.message,
    });
  }
};
