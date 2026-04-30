import Server from 'bare-server-node';
import http from 'http';
import nodeStatic from 'node-static';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const bare = new Server('/bare/', '');
const serve = new nodeStatic.Server(join(__dirname, 'Site'));
const server = http.createServer();

server.on('request', (request, response) => {
    if (bare.route_request(request, response)) return;
    serve.serve(request, response);
});

server.on('upgrade', (req, socket, head) => {
    if (bare.route_upgrade(req, socket, head)) return;
    socket.end();
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Divinity Proxy running on port ${port}`);
});
