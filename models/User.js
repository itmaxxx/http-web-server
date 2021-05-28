const { Schema, model } = require('mongoose');

const schema = new Schema({
	first_name: {
		type: String,
		required: true,
		minlength: 3
	},
	last_name: { type: String, required: true, minlength: 3 },
	email: { type: String, required: true, minlength: 3 },
	phone: { type: Number, required: true },
	location: {
		city: { type: String, required: true, minlength: 3 },
		adress: { type: String, required: true, minlength: 3 }
	},
	social_networks: { type: Array }
});

module.exports = model('User', schema);
