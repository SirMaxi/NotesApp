//Aca va a estar la conexion a la base de datos, la conexion de mongoose
const mongoose = require('mongoose');

const {NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE} = process.env;
const MONGODB_URL = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));