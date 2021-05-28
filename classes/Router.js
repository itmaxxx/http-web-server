const Emitter = require("./EventEmitter");

class Router {
	constructor() {
		this.get = new Emitter();
		this.post = new Emitter();
		this.delete = new Emitter();
	}
}

module.exports = Router;
