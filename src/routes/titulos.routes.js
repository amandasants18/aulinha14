const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Titulo = require("../models/titulo")
const controller = require('../controllers/tituloController')
//listar todos os titulos/get/find

router.get('/', async(req,res) => {
//ir no mongodb e trazer todos os titulos
    const titulos = await Titulo.find()
    res.json(titulos)
})


//criar novo titulo

router.post('/', async (req,res) => {

    const titulo = new Titulo({

        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        genero: req.body.genero,
        descricao: req.body.descricao,
        estudio: req.body.estudio,
        criadoEm: req.body.criadoEm
    })

   

const tituloJaExiste = await Titulo.findOne({nome: req.body.nome})
if (tituloJaExiste) {
  return res.status(409).json({error: 'Titulo ja cadastrado.'})
}
try{

  const novoTitulo = await titulo.save()
  res.status(201).json(novoTitulo)
}catch(err){

  res.status.apply(400).json({message: err.message})

}
})




router.patch('/:id', controller.updateOneT)
router.delete('/:id', controller.deleteOneT)



//listar todos titulos da pixar

router.get('/pixar', controller.getAllPixar)
router.get('/marvel', controller.getMarvel)
router.get('/ghibli', controller.getGhibli)

module.exports = router