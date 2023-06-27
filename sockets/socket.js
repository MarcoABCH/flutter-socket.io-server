const { io } = require('../index');

//Mensajes de Sockets
io.on('connection', client => {    
    console.log('Cliente conectado');

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    //lo que se pone aqui es para escuchar,
    //escuchar que?, lo que se esta emitiendo del archivo index.html
    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        //io.emit emite a todos los clientes
        io.emit('mensaje', { admin:'Nuevo mensaje'} );
    });
});
