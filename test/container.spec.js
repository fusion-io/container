const Container = require('./../Container');
const chai      = require('chai');
const assert    = chai.assert;

describe('Container tests suite', () => {

    let container = null;

    beforeEach(() => {
        container = new Container();
    });

    describe('binding a dependency', () => {

        it('should return bounded dependency', () => {
            container.bind('foo', () => 'bar');

            let resolved = container.make('foo');

            assert.equal(resolved, 'bar');
        });

        it('should return a new reference of dependency for each time resolve', () => {
            container.bind('ref', () => ({}));

            let ref1 = container.make('ref');
            let ref2 = container.make('ref');


            assert.notStrictEqual(ref1, ref2);
        });

        it('should throw binding exception when resolving not existed dependency', () => {
            assert.throw(() => {
                container.make('notExisted')
            }, 'E_BINDING: Could not resolve dependency [notExisted]');
        });

        it('can resolve dependency deeply', () => {
            container.bind('foo', () => 'foo-dep');
            container.bind('bar', (c) => {
                return {foo: c.make('foo')};
            });


            let bar = container.make('bar');

            assert.deepEqual(bar, {foo: 'foo-dep'});
        });

        it('can resolve dependency deeply regardless of binding order', () => {

            container.bind('bar', (c) => {
                return {foo: c.make('foo')};
            });

            container.bind('foo', () => 'foo-dep');

            let bar = container.make('bar');

            assert.deepEqual(bar, {foo: 'foo-dep'});
        });
    });

    describe('binding a dependency as a singleton', () => {
        it('always return a single instance', () => {
            container.singleton('ref', () => {
                return {};
            });

            let ref1 = container.make('ref');
            let ref2 = container.make('ref');

            assert.strictEqual(ref1, ref2);
        });
    });

    describe('binding a dependency as a value', () => {
        it('don\'t need to resolve', () => {
            container.value('foo', 'bar');

            assert.equal(container.make('foo'), 'bar');
        });
    });
});
