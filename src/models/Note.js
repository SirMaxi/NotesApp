//Aca sera el esquema de las notas que vamos a guardar dentro de la base de datos
const {Schema, model} = require('mongoose');

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    user: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Note', NoteSchema);