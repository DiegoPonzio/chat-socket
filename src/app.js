const { config } = require("dotenv");

config()

const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
})
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()



io.on('connection', socket => {
    console.log('socket conectado', socket.id);
    io.emit('socket_conectado',
        'Nuevo socket conectado: '
        + socket.id + '<br>');

    socket.on('disconnect', () => {
        console.log('socket desconectado', socket.id);
        io.emit('socket_desconectado', {
            texto: 'Socket desconectado.',
            id: socket.id,
        });
    });

    socket.on('chat:mensaje', (data) => {
        io.emit('chat:mensaje', data);
    });

    socket.on('chat:escribiendo', (usuario) => {
        socket.broadcast.emit('chat:escribiendo', usuario);
    });
})

nextApp.prepare().then(() => {
    app.get('/messages', (req, res) => {
        res.json(messages)
    })

    app.get("*", (req, res) => {
        return nextHandler(req, res)
    })

    app.post('/api/auth', (req, res) => {
        return nextHandler(req, res)
    })

    server.listen(process.env.PORT || 3000, (err) => {
        if (err) {
            process.exit(0)
        }
        console.log('> Ready on http://localhost:3000')
    })
})