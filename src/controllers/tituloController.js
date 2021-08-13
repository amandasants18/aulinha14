const mongoose = require('mongoose')
const Titulo = require('../models/titulo')

const getAllPixar = async(req,res) =>{

    const titulos = await Titulo.find().populate('estudio')
    const titulosFiltrados = titulos.filter(titulo=> titulo.estudio.nome === "Pixar")
    res.json(titulosFiltrados)
}

const getGhibli = async(req,res) =>{

    const titulos = await Titulo.find().populate('estudio')
    const titulosFiltrados = titulos.filter(titulo=> titulo.estudio.nome === "Ghibli")
    res.json(titulosFiltrados)
}
const getMarvel = async(req,res) =>{

    const titulos = await Titulo.find().populate('estudio')
    const titulosFiltrados = titulos.filter(titulo=> titulo.estudio.nome === "Marvel")
    res.json(titulosFiltrados)
}


const getAll = async (req, res) => {
  const titulos = await Titulo.find().populate('estudio')
  res.status(200).json(titulos)
}

const createTitle = async (req, res) => {
  const titulo = new Titulo({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    genero: req.body.genero,
    descricao: req.body.descricao,
    estudio: req.body.estudio,
    criadoEm: req.body.criadoEm
  })
  //TODO : criar validação se filme já existe
  const tituloJaExiste = await Titulo.findOne({nome: req.body.nome})
  if (tituloJaExiste) {
    return res.status(409).json({error: 'Titulo ja cadastrado.'})
  }
  try{
    const novoTitulo = await titulo.save()
    res.status(201).json(novoTitulo)
  } catch(err) {
    res.status(400).json({ message: err.message})
  }
}


const updateOneT = async(req,res) => {
    //tenta encontrar um estudio pelo id
        try{
         
            const titulo = await Titulo.findById(req.params.id)
            
            console.log()
            //se vc nao encontrar me retorne um erro
            if(titulo == null){ 
                return res.status(404).json({message: "Titulo nao encontrado"})
            }
            //no corpo da requisicao tem algo digitado? considere minha alteração
         if(req.body.nome != null){
    
            titulo.nome = req.body.nome
            titulo.genero = req.body.genero
            titulo.descricao = req.body.descricao
         }
    //ja salvou??
         const tituloAtualizado = await titulo.save()
    
         //retorne o documento atualizado
         res.status(200).json(tituloAtualizado)
        }catch(err){
    
            //se houve qualquer erro mostre o erro acima
            res.status(500).json({message: err.message})
        }
    
    
    }

const deleteOneT = async(req,res) =>{

    try{

        const titulo = await Titulo.findById(req.params.id)

        // se vc nao encontrar me retorne um erro

        if(titulo == null){
            return res.status(404).json({message: "Titulo nao encontrado"})
        }

    
     //deletando o estudio
      await titulo.remove()

     //retorne o documento deletados
     res.status(200).json({message: "Titulo deletado"})
    }catch(err){

        //se houve qualquer erro mostre o erro acima
        res.status(500).json({message: err.message})
    }
}
module.exports = {
  getAll,
  createTitle,
  getAllPixar,
  getMarvel,
  getGhibli,
  deleteOneT,
  updateOneT


} 