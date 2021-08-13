const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Estudio = require('../models/estudio')
const controller = require('../controllers/estudioController')

//listar todos os estudios/get/find
router.get('/', async (req, res) => {
  const estudios = await Estudio.find()
  res.json(estudios)
})

//criar um novo estudio/post/save
router.post('/', async (req, res) => {
  const estudio = new Estudio({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    criadoEm: req.body.criadoEm,
  })
 
  const estudioJaExiste = await Estudio.findOne({nome: req.body.nome})
  if (estudioJaExiste) {
    return res.status(409).json({error: 'Estudio ja cadastrado.'})
  }
try{

    const novoEstudio = await estudio.save()
    res.status(201).json(novoEstudio)
}catch(err){

    res.status.apply(400).json({message: err.message})
}
})


//listar um estudio/get/findById

//atualizar uma informacao especifica num estudio/patch/findById/save

router.patch('/:id', controller.updateOne)


//deletar um estudio/delete/findById/remove

router.delete('/:id', controller.deleteOne)

module.exports = router