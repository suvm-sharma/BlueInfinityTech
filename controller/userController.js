const User = require('../model/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    // SEND RESPONSE
    res.status(200).json({
      status: 'Success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // SEND RESPONSE
    res.status(200).json({
      status: 'Success',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true,
    });

    // SEND RESPONSE
    res.status(200).json({
      status: 'Success',
      data: {
        updatedUser,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    // SEND RESPONSE
    res.status(200).json({
      status: 'Success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.data,
    });
  }
};
