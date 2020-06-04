//Este es el archivo principal, el cual arranca la aplicacion
//Llamamos al objeto app que creamos en el archivo server.js
require('dotenv').config();

const app = require('./server');
require('./database');


app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});