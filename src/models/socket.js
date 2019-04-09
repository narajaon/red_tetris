module.exports = class Socket {
    constructor(namespace, io) {
        this.namespace = namespace ? namespace + '/' : '';
        this.io = io;
    }

    connect(cb) {
        this.io.on(`${this.namespace}connection`, cb);
    }

    listen(event, socket, cb) {
        socket.on(event, cb);
    }

    broadcast(socket, data) {
        socket.broadcast(data);
    }
}