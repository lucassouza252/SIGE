'use strict'
const express = require('express');
const inscritoController = require('../controllers/inscritoController');
const inscrito = new inscritoController();
const eventoController = require('../controllers/eventoController');
const evento = new eventoController();
const trilhaController = require('../controllers/trilhaController');
const trilha = new trilhaController();
const submissaoController = require('../controllers/submissaoController');
const submissao = new submissaoController();
const certificadoController = require('../controllers/certificadoController');
const certifiado = new certificadoController();

const passport = require('passport');

class Router{
	constructor(){
		this.router = express.Router();
		this.methods();
	}
	
	methods(){
		
		// Rota '/' é redirecionada para o login
		this.router.get('/', function(req, res){
			
			res.json({statusCode: 200});
			res.redirect('/login');
			
		});
		
		
		// Rota para cadastro de novo usuario
		this.router.post('/cadastro', function(req, res){inscrito.create(req, res);});
		
		// Rota para login de usuario
		this.router.post('/login', function(req, res){inscrito.login(req, res);});

		// Rota para editar perfil
		this.router.post('/editar_perfil', function(req, res){inscrito.edit_perfil(req, res);});

		// Rota para editar perfil
		this.router.post('/user/info', function(req, res){inscrito.info(req, res);});



		// Rota para cadastrar evento
		this.router.post('/evento/new', function(req, res){evento.create(req, res);});

		// Rota para cadastrar trilha
		this.router.post('/evento/trilha/new', function(req, res){trilha.create(req, res);});

		

		

		
		// Rota para alterar papeis
		this.router.post('/gerenciar_user/papel', function(req, res){inscrito.mudarPapel(req, res);});

		// Rota para listar usuarios
		this.router.post('/gerenciar_user/listar', function(req, res){inscrito.list(req, res);});

		// Rota para deletar usuario
		this.router.post('/gerenciar_user/remove', function(req, res){inscrito.remove(req, res);});



		// Rota para enviar submissao
		this.router.post('/submissao/enviar', function(req, res){submissao.create(req, res);});
		
		// Rota para listar eventos para submissão
		this.router.post('/submissao/evento/listar', function(req, res){submissao.list_event(req, res);});

		// Rota para listar trilhas para submissão
		this.router.post('/submissao/trilha/listar', function(req, res){submissao.list_trilha(req, res);});

		// Rota para pegar informações de trilhas
		this.router.post('/submissao/trilha/perguntas/listar', function(req, res){submissao.info_trilha(req, res);});
		




		// Rota listar certificados
		this.router.post('/certificado/listar', function(req, res){certifiado.listar(req, res);});
		
		// Rota gerar certificados
		this.router.post('/certificado/gerar', function(req, res){certifiado.gerar(req, res);});



		this.router.get("/certificado/:codigo", function(req, res){certifiado.view(req, res);});


		/*
		// Usando /cadastro apenas para testar o find, caso va usar no futuro, setar a rota correta
		this.router.get('/cadastro/:cpf', function(req, res){
			
			inscrito.findByCpf(req, res);
			
		});
		*/
		this.router.get('/inscritos/lista', function(req, res){
			
			inscrito.list(req, res);
			
		});
		
		this.router.delete('/inscritos/:cpf', function(req, res){
			
			inscrito.remove(req, res);
			
		});
		
		
		/*
		// Quando usuario nao autenticado tentar entrar em paginas de apenas usuarios, é enviado para login.
		this.router.get('/login', function(req, res){
			if(req.query.fail){
				res.json({message: "Usuario nao autenticado"});
			}
			
			res.json({statusCode: 200});
		});
		*/
	}
}





module.exports = Router;