const express = require('express');
const IncidentController = require('./controllers/IncidentController');
const OngController = require('./controllers/OngController');
const SessionController = require('./controllers/SessionController');
const ProfileController = require('./controllers/ProfileController');

const router = express.Router();

router.get('/ongs', OngController.list);
router.post('/ongs', OngController.create);

router.get('/incidents', IncidentController.list);
router.post('/incidents', IncidentController.create);
router.delete('/incidents/:id', IncidentController.delete);

router.post('/sessions', SessionController.create);

router.get('/profile', ProfileController.list);

module.exports = router;