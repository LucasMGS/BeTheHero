const express = require('express');
const IncidentController = require('./controllers/IncidentController');
const OngController = require('./controllers/OngController');
const SessionController = require('./controllers/SessionController');
const ProfileController = require('./controllers/ProfileController');
const { celebrate, Segments, Joi } = require('celebrate');

const router = express.Router();

//ONG Routes
router.get('/ongs', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), OngController.list);
router.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(), 
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create);

//Incidents Routes
router.get('/incidents', IncidentController.list);
router.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    }),

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()}), IncidentController.create);

router.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete);

//Session Routes
router.post('/sessions',celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.number().required()
    })
}) , SessionController.create);

//Profile Routes
router.get('/profile',celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.list);

module.exports = router;