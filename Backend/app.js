// Déclaration des dépendances
const express = require("express")
const cors = require('cors')
const swaggerUI = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

// Déclarations des routes
const commentaireRoute = require('./routes/commentaires')
const evenementRoute = require('./routes/evenements')

// Configuration de APP
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/commentaire', commentaireRoute);
app.use('/evenement', evenementRoute);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// Log développement
/*
app.use((req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
})
*/

// Ecoute du serveur
app.listen(3000, () => {
    console.log('Server API Stockoss is running on port 3000');
})