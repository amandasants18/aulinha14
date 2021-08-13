#MEU APRENDIZADO - ESTUDIO GHIBLI, MARVEL E PIXAR

<p align="center">Aqui falarei um pouco sobre o CRUD que foi criado utilizando os métodos HTTP :</p>


      * [POST](#POST)
      * [GET](#GET)
      * [PATCH](#update)
      * [DELETE](#delete)

#POST:

No meu entendimento, ao utilizar o método POST, via postman, observei que foi possível armazenar as informações no ROBO3T, através de um
JSON

Utilizei este método, em titulos: 



router.post('/', async (req,res) => {

    const titulo = new Titulo({

        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        genero: req.body.genero,
        descricao: req.body.descricao,
        estudio: req.body.estudio,
        criadoEm: req.body.criadoEm
    })


#GET:


No meu entendimento, ao utilizar o método GET, via postman, observei que consegui visualizar as informações que estavam sendo enviadas atraves do método POST.

Utilizei como exemplo, em titulos:


router.get('/', async(req,res) => {
//ir no mongodb e trazer todos os titulos
    const titulos = await Titulo.find()
    res.json(titulos)
})



#PATCH:


No meu entendimento, ao utilizar o método PATCH, via postman, observei que consegui alterar informações especificas de um titulo, atraves do ID passado na URL.


Utilizei como exemplo, em titulos:

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


#DELETE:


No meu entendimento, ao utilizar o método DELETE, consegui deletar titulo especifico atraves do ID.

Como exemplo:


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





*Um breve e pequeno resumo de muito aprendizado... Agradeço a profa Simara por todo ensinamento passado.


