const express= require('express');
const router= express.Router();
const controller= require('../controllers/classes')

router.get('/getClass',controller.getClasses)
module.exports= router;