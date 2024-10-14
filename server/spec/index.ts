import open from 'open';
import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
    if (req.url === '/spec') {
        const yamlData = fs.readFileSync('server/spec/spec.yaml', 'utf8');
        res.writeHead(200, { 'Content-Type': 'application/yaml' });
        res.end(yamlData);
    } else {
        const htmlData = fs.readFileSync('server/spec/index.html', 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlData);
    }
});

server.listen(3002, () => {
    console.log('Server listening on port 3002');
});

await open('http://localhost:3002');
