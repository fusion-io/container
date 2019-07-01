const Container = require('./Container');

const container = new Container();

/**
 * Making a singleton Container
 *
 * @type {Container}
 */
module.exports = container;

/**
 * Expose the Container class
 *
 * @type {Container}
 */
exports.Container = Container;

/**
 * Bind a Symbol to the container
 */
exports.bind = (dependencies = []) => Symbol => {

    const Wrapper = class extends Symbol {
        static get dependencies() {
            return dependencies;
        }
    };

    container.autoBind(Wrapper);

    return Wrapper;
};

/**
 * Bind a Symbol to the container as a singleton
 */
exports.singleton = (dependencies = []) => Symbol => {

    const Wrapper = class extends Symbol {
        static get dependencies() {
            return dependencies;
        }
    };

    container.autoSingleton(Wrapper);

    return Wrapper;
};

/**
 * Bind a Symbol to the container as an Concrete of given Abstract
 */
exports.bindInversion = (AbstractSymbol, dependencies = []) => Symbol => {
    const Wrapper = class extends Symbol {
        static get dependencies() {
            return dependencies;
        }
    };

    container.bindInversion(AbstractSymbol, Wrapper);

    return Wrapper;
};

/**
 * Bind a Symbol to the container as an Concrete of given Abstract as a singleton
 */
exports.singletonInversion = (AbstractSymbol, dependencies = []) => Symbol => {
    const Wrapper = class extends Symbol {
        static get dependencies() {
            return dependencies;
        }
    };

    container.singletonInversion(AbstractSymbol, Wrapper);

    return Wrapper;
};

