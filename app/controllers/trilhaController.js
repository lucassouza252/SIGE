'use strict';
const index = require('../models/index');
const autenticador = require('../routes/autenticado');

class TrilhaController{
		
	async create(req, res){
		let newTrilha = {
			token: req.body.token,
			nome: req.body.nome,
			eventoId: req.body.eventoId,
			perguntas : req.body.perguntas
		}
		
		var user = await autenticador.validar(newTrilha.token);
		if(!user){
			return res.json({sucess: false, message: "Token não válido", statusCode: 200})	
		}
		if(user.papel !=1){
			return res.json({sucess: false, message: "Somente administradores podem criar trilha", statusCode: 200})	
		}

		
		var trilha = await index.Trilhas.create(newTrilha)
		.then((x)=>{
			
			newTrilha.perguntas.map(pergunta => { 
				var perg = {
					pergunta: pergunta.pergunta,
					opcaoPergunta: pergunta.opcaoPergunta,
					campoUm: pergunta.campo_um,
					campoDois: pergunta.campo_dois,
					trilhaId: x.id
				}
			
				index.PerguntaTrilhas.create(perg);
				//.catch((erro)=> res.json({sucess: false, message: 'Falha ao criar pergunta', statusCode: 500}));
	
			});
			res.json({sucess: true, message: 'Trilha criada Com Sucesso', statusCode: 200})
		}
			).catch((erro)=> res.json({sucess: false, message: 'Falha ao criar trilha', statusCode: 500}));		
	}
}

module.exports = TrilhaController;