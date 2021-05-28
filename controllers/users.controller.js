const User = require('../models/User');

function createUser(user) {
	let newUser = new User(user);

	return newUser.save();
}

function findUser(user_id) {
	return User.findOne({ _id: user_id });
}

function deleteUser(user_id) {
	return User.findOneAndDelete({ _id: user_id });
}

module.exports = {
	createUser,
	findUser,
	deleteUser
};
