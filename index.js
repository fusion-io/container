const Container = require('./Container');

const container = new Container();

/**
 * Making a singleton Container
 *
 * @type {Container}
 */
exports.container = container;

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
    container.autoBind(class extends Symbol {
        static get dependencies() {
            return dependencies;
        }
    });
};

/**
 * Bind a Symbol to the container as a singleton
 */
exports.singleton = (dependencies = []) => Symbol => {
    container.autoSingleton(class extends Symbol {
        static get dependencies() {
            return dependencies;
        }
    });
};

/**
 * Bind a Symbol to the container as an Concrete of given Abstract
 */
exports.bindInversion = (AbstractSymbol, dependencies = []) => Symbol => {
    container.bindInversion(AbstractSymbol, class extends Symbol {
        static get dependencies() {
            return dependencies;
        }
    });
};

/**
 * Bind a Symbol to the container as an Concrete of given Abstract as a singleton
 */
exports.singletonInversion = (AbstractSymbol, dependencies = []) => Symbol => {
    container.singletonInversion(AbstractSymbol, class extends Symbol {
        static get dependencies() {
            return dependencies;
        }
    });
};

