const { Router } = require('express');
const router = Router();

const { renderNoteForm, 
        createNewNote,
        renderNotes,
        renderEditForm,
        updateNote,
        deleteNote 
    } = require('../controllers/notes.controller');

const {isAuthenticated} = require('../helpers/auth');

//Nueva Nota
router.get('/notes/add', isAuthenticated, renderNoteForm);

router.post('/notes/new-note', isAuthenticated, createNewNote);

//Get todas las notas
router.get('/notes', isAuthenticated, renderNotes);

//Editar Notas
router.get('/notes/edit/:id', isAuthenticated, renderEditForm);

router.put('/notes/edit/:id', isAuthenticated, updateNote);

//Borrar Notas
router.delete('/notes/delete/:id', isAuthenticated, deleteNote);

module.exports = router;