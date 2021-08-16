'use strict';
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const Router = require('./app/routes/router');
const passport = require('passport');
const session = require('express-session');
require('./config/passportConfig')(passport);
const autenticado = require('./app/routes/autenticado');

const cors = require('cors')

class Server {
	
	constructor(){
		
		this.app = express();
		this.config();
		this.listen();
		this.router();
		
	}
	
	config(){
		this.app.use(cors())
		this.app.use(bodyParser.urlencoded({extended: true}));
		this.app.use(bodyParser.json());
		this.app.use(express.static(__dirname+'/public'));
		
		this.app.use(session({
			secret: '123', 
			resave: false, // Sessao deve ser salva em todas as requisiçoes? Nao = false
			saveUninitialized: true, // Prestar atençao nessa função sobre o que ela faz.
			cookie: { maxAge: 30 * 60 * 1000 } // 30min
		}));
		this.app.use(passport.initialize());
		this.app.use(passport.session());
		
	}
	
	listen(){
		
		this.porta = 3000;
		this.server = this.app.listen(this.porta);
		this.server.on('error', function(erro){
			console.log('Erro: '+erro);
		});
		this.server.on('listening', function(){
			console.log('Listening at localhost:3000');
		});
		
	}
	
	router(){
		
		this.routes = new Router();
		this.app.use('/', this.routes.router);
		
	}
	
}

module.exports = new Server().server;