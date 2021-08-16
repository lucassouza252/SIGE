'use strict'
const index = require('../models/index');
const autenticador = require('../routes/autenticado');

class SubmissaoController{

    async list_event(req, res){
        
		let lista = []
		let lista_eventos = await index.Eventos.findAll()		
		.then(function(evento){
			evento.forEach((data)=> lista.push(data.dataValues));
			//res.json({sucess: true, statusCode: 200});
			res.json(lista);
			//console.log(lista_limpa); // Console de testes
		}).catch((erro)=> res.json({sucess: false, mesage: "Lista de Eventos Vazia", statusCode: 500}));
	
    }

    async info_trilha(req, res){

        var idTrilha = req.body.id_trilha;

        await index.PerguntaTrilhas.findAll({
			where: {"trilhaId": idTrilha}
		}).then(function(trilha_encontrada){
			
			//console.log(inscrito_encontrado.dataValues); // Console de testes
			//res.json({sucess: true, statusCode: 200});
			
			res.json(trilha_encontrada);
		}).catch((erro)=> res.json({sucess: false, mesage: "Perguntas Não Encontrada", statusCode: 500}));
	


    }

    async list_trilha(req, res){
        
        var eventoId =  req.body.eventoId;
		
		let lista = []
		let lista_trilha = await index.Trilhas.findAll({
			where: {
				eventoId
			}
		})		
		.then(function(trilha){
			trilha.forEach((data)=> lista.push(data.dataValues));
			//res.json({sucess: true, statusCode: 200});
           
			res.json(lista);
			//	console.log(lista_limpa); // Console de testes
		}).catch((erro)=> res.json({sucess: false, mesage: "Lista de Trilhas Vazia", statusCode: 500}));
    }



	async create(req, res){
		console.log(req.body);
		let newSubmissao = {
			token: req.body.token,
            titulo: req.body.titulo,
            texto: req.body.texto,
			palavra_chave: req.body.palavra_chave,
            autores : req.body.autores.toString(),
            cpf_orientador: req.body.cpf_orientador,
            mensagem_apoio: req.body.mensagem_apoio,
            tipo_apresentacao:req.body.tipo_apresentacao,
            status_aprovacao: 2,
            area_conhecimento:req.body.area_conhecimento,            
            inscritoId:0,
            eventoId:req.body.eventoId,
            trilhaId:req.body.trilhaId,
            respostas:req.body.respostas

		}

       


		var user = await autenticador.validar(newSubmissao.token);
		if(!user){
			return res.json({sucess: false, message: "Token não válido", statusCode: 200})	
		}
		if(user.papel !=3){
			return res.json({sucess: false, message: "Somente membros podem submeter", statusCode: 200})	
		}

        
        
		newSubmissao.inscritoId = user.id;
        
		var submissao = await index.Submissoes.create(newSubmissao)
		.then((x)=>{
            //console.log('aqui entrou')
            newSubmissao.respostas.map(resposta => {

                //console.log('entrou')
                let newResposta = {
                    resposta_texto: resposta.resposta_aberta,
                    resposta_radio: resposta.resposta_radio,
                    submissaoId: x.id,
                    perguntasId : resposta.perguntaId,
                    inscritoId: newSubmissao.inscritoId 
        
                }
                //console.log(newResposta)
              
               index.RespostaSubmissoes.create(newResposta)

            })

            
            


			res.json({sucess: true, message: 'Submissão Enviada Com Sucesso', statusCode: 200})
		    }
			).catch((erro)=> res.json({motivo:erro, sucess: false, message: 'Falha ao enviar submissão', statusCode: 500}));
		 
		
	}
}

module.exports = SubmissaoController;