// Déclaration des variables
const { Router } = require('express')
const { devNull } = require('os')
const db = require('../database')
const router = Router()

// Routes
    // Récupérations des commentaires selon l'id de l'évènement
router.get('/:idEvent', async (req, res) => {

})

    // Création d'un nouveau commentaires
router.post('/', (req, res) => {

})

// Exportation du module
module.exports = router