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

function getRandomUser() {
	return new Promise((resolve, reject) => {
		User.countDocuments().exec((err, count) => {
			if (err) return reject(err);

			let random = Math.floor(Math.random() * count);

			User.findOne()
				.skip(random)
				.exec(function (err, result) {
					if (err) return reject(err);

					return resolve(result);
				});
		});
	});
}

module.exports = {
	createUser,
	findUser,
	deleteUser,
	getRandomUser
};
