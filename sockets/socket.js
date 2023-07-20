const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band( 'Caifanes' ) );
bands.addBand(new Band( 'Mana' ) );
bands.addBand(new Band( 'Heroes del Silencio' ) );
bands.addBand(new Band( 'Jaguares' ) );
bands.addBand(new Band( 'Sidartha' ) );

//Mensajes de Sockets
io.on('connection', client => {    
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands() );

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

    //client.on('emitir-mensaje', ( payload ) => {        
        //emite a todos los clientes conectados
        //io.emit('nuevo-mensaje', payload );
        //console.log(payload);
        //emite a todos los clientes excepto a mi
        //client.broadcast.emit('nuevo-mensaje', payload );

    //});
    client.on('vote-band', ( payload ) => {
        bands.voteBand( payload.id );
        io.emit('active-bands', bands.getBands() );
    });

    client.on('add-band', ( payload ) => {        
        const newBand = new Band( payload.name );
        //Agregamos a las bandas la nueva que recibimos de la pp
        bands.addBand( newBand );
        //Una vez agregada, la emitimos a todos los clientes para que la vean
        io.emit('active-bands', bands.getBands() );
    });

    client.on('delete-band', ( payload ) => {       
        console.log(payload);
        bands.deleteBand( payload.id );//Borramos la banda del id especifico
        //Ahora emitimos la lista de las bandas a todos los clientes, excepto ami mismo
        io.emit('active-bands', bands.getBands());        
    });
});
