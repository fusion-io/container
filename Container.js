const TYPE_BINDING      = 'binding';
const TYPE_SINGLETON    = 'singleton';

class Container {

    bindings = {};

    resolved = {};

    /**
     * Register a factory of a dependency to the Container
     *
     * @param {string} dependencyName
     * @param {Function} factory
     * @returns {Container}
     */
    bind(dependencyName, factory) {
        this.bindings[dependencyName] = {
            factory: factory,
            type: TYPE_BINDING
        };

        return this;
    }

    /**
     * Register a value as a dependency to the Container
     *
     * @param {string} dependencyName
     * @param value
     * @return {Container}
     */
    value(dependencyName, value) {
        this.resolved[dependencyName] = value;

        return this;
    }

    /**
     * Register a dependency to the Container as a singleton
     *
     * @param {string} dependencyName
     * @param {Function} factory
     * @returns {Container}
     */
    singleton(dependencyName, factory) {
        this.bindings[dependencyName] = {
            factory: factory,
            type: TYPE_SINGLETON
        };

        return this;
    }

    /**
     * Resolve a dependency
     *
     * @param dependencyName
     * @param customArguments
     * @return {*}
     */
    make(dependencyName, ...customArguments) {

        if (this.resolved[dependencyName]) {
            return this.resolved[dependencyName];
        }

        let bindingRecipe = this.bindings[dependencyName];

        if (!bindingRecipe) {
            throw new Error(`E_BINDING: Could not resolve dependency [${dependencyName}]`);
        }

        let resolved = bindingRecipe['factory'](this);

        if (TYPE_SINGLETON === bindingRecipe['type']) {
            this.resolved[dependencyName] = resolved
        }

        return resolved;
    }
}

module.exports = Container;
