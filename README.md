@fusion/container
-----------------

Simple and headless container for dependencies management container.

## Initialize a container

```js

import {Container} from "@fusion.io/container";

let container = new Container();
```

After we have an initialized container, we can register some services into it. There are 3 binding methods are supported: `bind()`, `singleton()` & `value()`.

### Using `container.bind(serviceName, serviceFactory)`

Example:

```js

container.bind('fooService', () => 'foo');

let fooService = container.make('fooService');

// assert.equal(fooService, 'foo');
```

`container.bind()` will register a service with the name `fooService` as the first parameter, and the factory function as the second parameter.

After we have a registered service via `container.bind()`, we can get back the service by calling `container.make()` method.

Each time the `container.make()` is called, the container will **invoke** the factory function to get the service instance (the `foo` value).

### Using `container.singleton(serviceName, serviceFactory)`

Example:

```js

container.singleton('fooService', () => 'foo');

let fooService = container.make('fooService');

// assert.equal(fooService, 'foo');
```

`container.singleton()` method works similar to `container.bind()` method. Excepts that the factory method **will be invoked** once at the first call of the `make()` method and will be cached. So next time, if the `make()` was called again, the service instance will be returned from the cache instead of invoking the factory method again.

This behavior will ensuring that we **always** get the same service instance regardless how many time we call the `make()` method.


### Using `container.value(serviceName, serviceInstance)`

Example:

```js

container.value('fooService',  'foo');

let fooService = container.make('fooService');

// assert.equal(fooService, 'foo');
```

`container.value()` should be used when we want to register a value into the container, or a service that we already have the instance before.

One of the common scenario is storing the application configuration values, for example:

```js

container.value('config', { port: process.env.PORT || 3000 });
```

## Resolving nested dependencies

We can also call the `container.make()` method inside the service factory function. Therefore, we can resolve nested dependencies regardless the binding order

```js

container.bind('bar', (container) => {
    return {foo: container.make('foo')}; // Using make here is also okay
});

container.bind('foo', () => 'foo-dep');

let bar = container.make('bar');

// assert.deepEqual(bar, {foo: 'foo-dep'});
```


## Resolving with parameters

Optionally, we can resolve a service with some given parameters. Those parameters will be passed to the service factory function when invoked.


```js
container.bind('foo', (container, firstParameter = null, secondParamter = null) => {
    return {
        name: 'aFooService',
        firstParameter,
        secondParamter
    }
});

// assert.deepEqual(container.make('foo', 'first', 'second'), { name: 'aFooService', firstParameter: 'first', secondParamter: 'second' });
```

That's it. Happy injecting! :kissing_closed_eyes:
