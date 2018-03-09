const React = require('react');

module.exports = function nextHTTP(app) {
    return class extends React.Component {
        static async getInitialProps(ctx) {
            if (!ctx.req) {
                throw new Error('This component should not be used on the client-side.');
            }

            return new Promise(function (resolve, reject) {

                // Wait until handler has responded to the request
                ctx.res.on('finish', function () {
                    resolve({});
                })

                try {
                    // Pass request to handler
                    app(ctx.req, ctx.res);
                } catch (e) {
                    reject(e);
                }
            });
        }

        render() {
            throw new Error('This component should not be rendered directly.');
        }
    }
}
