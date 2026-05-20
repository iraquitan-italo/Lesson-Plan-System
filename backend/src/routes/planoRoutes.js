const express = require('express');
const router = express.Router();

const planoController = require('../controllers/planoController');
const iaController = require('../controllers/iaController');


const { validarPlano } = require('../validators/planoValidator');

router.post('/planos', validarPlano, planoController.create);

router.put('/planos/:id', validarPlano, planoController.update);

router.get('/planos', planoController.getAll);
router.delete('/planos/:id', planoController.delete);

router.post('/planos/smart-assist', iaController.gerarRecomendacoes);

module.exports = router;