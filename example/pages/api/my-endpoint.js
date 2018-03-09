import http from '../../../';
import connect from 'connect';

const app = connect();

app.use((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, world');
});

export default http(app);
