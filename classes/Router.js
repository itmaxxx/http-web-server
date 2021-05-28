const Emitter = require('./EventEmitter');

class Router {
  constructor() {
    this.get = new Emitter();
    this.post = new Emitter();
    this.delete = new Emitter();
  }

  // Add listeners to route from anouther route
  _addRoute(from, to) {
    Object.values(from._patternEvents).forEach((f, i) => {
      if (typeof f !== 'function') return;

      let pattern = Object.keys(from._patternEvents)[i];
      let reg = pattern.substr(1, pattern.length - 2);

      to.on(new RegExp(reg), f);
    });
  }

  // Add routes from another router
  addRoutes(router) {
    this._addRoute(router.get, this.get);
    this._addRoute(router.post, this.post);
    this._addRoute(router.delete, this.delete);
  }
}

module.exports = Router;
