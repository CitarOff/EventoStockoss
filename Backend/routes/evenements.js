// Déclaration des variables
const { Router } = require('express')
const db = require('../database')
const router = Router()

// Routes
    // Récupérations de tout les évènements
router.get('/', async (req, res) => {
    const resultDB = await db.promise().query('SELECT id, nom, DATE_FORMAT(date, "%d/%m/%Y %H:%i") AS date, DATE_FORMAT(date, "%d/%m/%Y") AS dateNT, email FROM evenements WHERE DATEDIFF(NOW(), evenements.date)<=10')
    res.status(200).send(resultDB[0])
})

    // Récupérations du nombre d'évènements dans la journée
router.get('/today', async (req, res) => {
    const resultDB = await db.promise().query('SELECT COUNT(id) AS count FROM evenements WHERE DATE_FORMAT(`date`, "%Y/%m/%d") = CURDATE()')
    res.status(200).send(resultDB[0][0])
})

    // Récupérations de toutes les dates au formats de la DB
router.get('/date', async (req, res) => {
    const resultDB = await db.promise().query('SELECT date FROM evenements WHERE DATEDIFF(NOW(), evenements.date)<=10')
    res.status(200).send(resultDB[0])
})

    // Récupération d'un évenement selon son ID
router.get('/:idEvent', async (req, res) => {
    if(req.params.idEvent == "") { res.status(400).send({error: "Aucun ID d'évènement en paramètre"})}

    const resultDB = await db.promise().query(`SELECT nom, DATE_FORMAT(date, "%d/%m/%Y %H:%i") AS date, description, email FROM evenements WHERE id = ${req.params.idEvent}`)
    res.status(200).send(resultDB[0])
})

    // Création d'un évènement
router.post('/', (req, res) => {
    const {nom, date, desc, email, heure} = req.body

    if(nom && date && desc && email && heure) {
        try {
            const full_date = date + ' ' + heure;
            let sqlReq = `INSERT INTO evenements (nom, date, description, email) VALUES(?, ?, ?, ?)`;
            let sqlVal = [nom, full_date, desc, email];

            db.query(sqlReq, sqlVal, (err) => {
                if (err) {
                    console.log(err.message)
                    res.status(500).send(err.message);
                }

                res.sendStatus(200)
              });
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    } else {
        res.status(400).send({error: "Données manquantes"})
    }
})

// Exportation du module
module.exports = router