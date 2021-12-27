// Déclaration des variables
const { Router } = require('express')
const { devNull } = require('os')
const db = require('../database')
const router = Router()

// Routes
    // Récupérations des commentaires selon l'id de l'évènement
router.get('/:idEvent', async (req, res) => {
    if(req.params.idEvent == "") {res.status(400).send({error: "Aucun ID d'évènement en paramètre"})}

    const resultDB = await db.promise().query(`SELECT * FROM commentaires WHERE id_evenement = ${req.params.idEvent}`)
    res.status(200).send(resultDB[0])
})

    // Création d'un nouveau commentaires
router.post('/', (req, res) => {
    const {id_event, auteur, message} = req.body;

    if(id_event && auteur && message) {
        try {
            db.promise().query(`INSERT INTO commentaires (id_evenement, auteur, message) VALUES('${id_event}','${auteur}','${message}')`)
            res.sendStatus(201)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }else{
        res.status(400).send({error: "Données manquantes"})
    }
})

// Exportation du module
module.exports = router