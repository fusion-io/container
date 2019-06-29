@fusion/container
-----------------

Simple and headless container for dependencies management container.

## Initialize a container

```js

import {Container} from "@fusion.io/container";

let container = new Container();
```

After we have an initialized container, we can register some services into it. There are 3 binding methods are supported: `bind()`, `singleton` & `value`.

## Using `container.bind()`

Example test code:

```js

container.bind('fooService', () => 'foo');

let fooService = container.make('fooService');

// assert.equal(fooService, 'foo');
```

`container.bind()` will register a service with the name `fooService` as the first parameter, and the factory function as the second parameter.

After we have a registered service via `container.bind()`, we can get back the service by calling `container.make()` method.

Each time the `container.make()` is called, the container will **invoke** the factory function to get the service instance (the `foo` value).

