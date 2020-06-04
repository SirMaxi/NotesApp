//Aca va a estar el codigo de express, ya qwue es el codigo del servidor
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//*Inicializacion
const app = express();
require('./config/passport');

//*Configuraciones (Lo que quiero que haga express basado en unos modulos)
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')); //Aca estamos indicando que la carpeta views esat dentro de src, porque por defecto esta afuera de esta carpeta
app.engine('.hbs', exphbs({
    defaultLayaout: 'main',
    layaoutsDir: path.join(app.get('views'), '/layaouts'),
    partialsDir: path.join(app.get('views'), '/partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//*Midlewares (Funciones que se van a ir ejecutando a medida que van llegando peticiones)
app.use(express.urlencoded({extended: false}));//Cada vez que lleguen datos de un formulario, a travez de cualquier metodo, vamos a convertir esos datos en un objeto JSON, para poder manipularlo en codigo
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//*Variables Globales (Aqui vamos a crear variables que vamos a poder acceder desde todo el proyecto)
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//*Rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));

//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));//Aca indicamos donde esta la carpeta public

//Exportamos el objeto app que creamos a nuestro archivo principal(index.js)
module.exports = app;