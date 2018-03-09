# next-http

Higher Order Component to mount arbitrary HTTP request handlers as [Next.js](https://github.com/zeit/next.js) pages. (When rendering on the server side.)

Allows to more easily expose custom handlers (e.g. for simple API endpoints) while still leveraging Next.js's bundling, transpilation, routing and hot code reloading functionality.

Compatible with [Connect](https://github.com/senchalabs/connect), [Express](http://expressjs.com) and [Koa](https://github.com/koajs/koa) apps / middleware.

**Important:** Rendering this component on the client side will result in an error. To prevent shipping your back end code to the client side, you should instruct webpack to ignore the server-only files via `webpack.IgnorePlugin`. [See the example below](#nextconfigjs).

## Example

### pages/api/my-endpoint.js

```js
import http from 'next-http';
import connect from 'connect';

const app = connect();

app.use((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, world');
});

export default http(app);
```

### next.config.js

```js
const webpack = require('webpack');

module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
        if (!isServer) {
            // Exclude all paths starting with ./pages/api/ from webpack builds
            config.plugins.push(new webpack.IgnorePlugin(/^\.\/pages\/api\/.*$/))
        }
        return config
    },
}
```

## FAQ

### Q. What's the point of using this instead of just responding to HTTP requests directly on `getInitialProps()`?

Mostly to reduce boilerplate. This module will gracefully wait until the HTTP request handler is done serving the request. It also looks cleaner IMO.

### Q. How can I handle POST / DELETE / PUT requests? I get a `501 Not Implemented` response from Next.js

Next.js will by default refuse non GET / HEAD HTTP requests on its filesystem router. You'll need to use a [custom server with routing](https://github.com/zeit/next.js/#custom-server-and-routing).

## License

MIT
