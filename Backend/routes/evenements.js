// Déclaration des variables
const { Router } = require('express')
const db = require('../database')
const router = Router()

// Routes
    // Récupérations de tout les évènements
router.get('/', (req, res) => {

})

    // Récupération d'un évenement selon son ID
router.get('/:idEvent', (req, res) => {

})

    // Création d'un évènement
router.post('/', (req, res) => {

})

// Exportation du module
module.exports = router