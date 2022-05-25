const http = require('http');
const app = require('./app');
const {sequelize} = require("./models");
const cors = require("cors");

const corsOptions = {
    origin: ["http://localhost:3000","http://localhost:3001"],
    credentials:true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);


const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);


server.on('error', errorHandler);
server.on('listening', async () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : + port;
    console.log('Listening on http://localhost:' + bind+"/");

    await sequelize.sync().then(() => console.log('Sync with DATABASE')).catch((err) => console.log("Failed with Sync DATABASE", err));
    await sequelize.authenticate().then(() => console.log('Connection DB OK')).catch((err) => console.log("Failed to connect to DB : ", err));
});

server.listen(port);