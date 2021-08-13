  
const mongoose = require('mongoose')
const Estudio = require('../models/estudio')

const getAll = async (req, res) => {
  const estudios = await Estudio.find()
  res.json(estudios)
}

const createStudio = async (req, res) => {
  const estudio = new Estudio({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    criadoEm: req.body.criadoEm,
  })

}
const deleteOne = async(req,res) =>{

    try{

        const estudio = await Estudio.findById(req.params.id)

        // se vc nao encontrar me retorne um erro

        if(estudio == null){
            return res.status(404).json({message: "Estudio nao encontrado"})
        }

    
     //deletando o estudio
      await estudio.remove()

     //retorne o documento deletados
     res.status(200).json({message: "Estudio deletado"})
    }catch(err){

        //se houve qualquer erro mostre o erro acima
        res.status(500).json({message: err.message})
    }
}
const updateOne = async(req,res) => {
//tenta encontrar um estudio pelo id
    try{
     
        const estudio = await Estudio.findById(req.params.id)
        
        //se vc nao encontrar me retorne um erro
        if(estudio == null){
            return res.status(404).json({message: "Estudio nao encontrado"})
        }
        //no corpo da requisicao tem algo digitado? considere minha alteração
     if(req.body.nome != null){

        estudio.nome = req.body.nome
     }
//ja salvou??
     const estudioAtualizado = await estudio.save()

     //retorne o documento atualizado
     res.status(200).json(estudioAtualizado)
    }catch(err){

        //se houve qualquer erro mostre o erro acima
        res.status(500).json({message: err.message})
    }


}

module.exports = {
  getAll,
  createStudio,
  updateOne,
  deleteOne
}