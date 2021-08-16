'use strict'
const index = require('../models/index');
const autenticador = require('../routes/autenticado');

class EventoController{
	
	constructor(){
		
	}
	
	async list(req, res){
	}
	
	async find(req, res){
	}
	
	async create(req, res){
		// cria um objeto inscrito com as informações mandada pelo form de inscrição
		let newEvento = {
			token: req.body.token,
			nome: req.body.nome,
			url: req.body.url,
			instituicao: req.body.instituicao,
			sigla: req.body.sigla,
			maximo_inscritos: req.body.maximo_inscritos,
			virtual: req.body.virtual,
			descricao: req.body.descricao,
			submissao: req.body.submissao,
			inicio_submissao: req.body.inicio_submissao,
			fim_submissao: req.body.fim_submissao,
			inicio_revisao: req.body.inicio_revisao,
			fim_revisao: req.body.fim_revisao,
			inicio_evento: req.body.inicio_evento,
			fim_evento: req.body.fim_evento,
			pago: req.body.pago,
			valor_inscricao: req.body.valor_inscricao,
			max_ativ_inscrito: req.body.max_ativ_inscrito,

		}; 
		
		//console.log(newEvento);

		var user = await autenticador.validar(newEvento.token);
		if(!user){
			return res.json({sucess: false, message: "Token não válido", statusCode: 401})	
		}
		if(user.papel !=1){
			return res.json({sucess: false, message: "Somente administradores podem criar evento", statusCode: 401})	
		}

		
		index.Eventos.create(newEvento)
		.then(()=> res.json({sucess: true, message: 'Evento Criado Com Sucesso', statusCode: 200}))
		.catch((erro)=> res.json({sucess: false, message: 'Falha ao Criar Evento', statusCode: 500}));
				
	}
	
	async edit(req, res){
	}
	
	async remove(req, res){
	}
	
}

module.exports = EventoController;