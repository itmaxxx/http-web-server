const Router = require('../classes/Router');
const {
	createUser,
	findUser,
	deleteUser
} = require('../controllers/users.controller');
const { validateString } = require('../utils/validator');

const router = new Router();

router.post.on(/^\/api\/users\/create$/, async function (req, res) {
	try {
		const { first_name, last_name, email, phone, location, social_networks } =
			req.body;

		validateString('first_name', first_name, true, 1, 32);
		validateString('last_name', last_name, true, 1, 32);
		validateString('email', last_name, true, 3, 32);
		validateString('phone', phone, true, 3, 13);

		let user = {
			first_name,
			last_name,
			email,
			phone
		};

		if (location) {
			let loc = JSON.parse(location);

			validateString('location.city', loc.city, true, 3, 32);
			validateString('location.adress', loc.adress, true, 3, 64);

			user.location = loc;
		} else {
			throw {
				error: true,
				message: 'location is required'
			};
		}

		if (social_networks) {
			let soc = JSON.parse(social_networks);

			soc.forEach((s) => {
				validateString('social network name', s.name, true, -1, 32);
				validateString('social network link', s.link, true, 3, 64);
			});

			user.social_networks = soc;
		}

		let result = await createUser(user);

		console.log('User created with id: ' + result._id);

		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		return res.end(
			JSON.stringify({
				success: true,
				message: 'User created with id: ' + result._id
			})
		);
	} catch (error) {
		console.error(error);

		res.writeHead(400, {
			'Content-Type': 'application/json'
		});

		return res.end(JSON.stringify(error));
	}
});

router.get.on(/^\/api\/users\/([a-z0-9]{24})$/, async function (req, res) {
	try {
		const user_id = this.matches[1];

		validateString('user_id', user_id, true, 24, 24);

		let user = await findUser(user_id);

		if (user) {
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});

			return res.end(JSON.stringify(user));
		} else {
			throw { error: true, message: 'User not found' };
		}
	} catch (error) {
		console.error(error);

		res.writeHead(400, {
			'Content-Type': 'application/json'
		});

		return res.end(JSON.stringify(error));
	}
});

router.delete.on(/^\/api\/users\/delete$/, async function (req, res) {
	try {
		const { user_id } = req.body;

		validateString('user_id', user_id, true, 24, 24);

		let result = await deleteUser(user_id);

		if (result) {
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});

			return res.end(JSON.stringify({ success: true }));
		} else {
			throw { error: true, message: 'User not found' };
		}
	} catch (error) {
		console.error(error);

		res.writeHead(400, {
			'Content-Type': 'application/json'
		});

		return res.end(JSON.stringify(error));
	}
});

module.exports = router;
