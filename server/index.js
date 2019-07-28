const server = require('./server');

const PORT = 3000

server.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});