const localStrategy = require('passport-local').Strategy;
const Inscrito = require('../app/models/inscrito');
const bcrypt = require('bcrypt');

module.exports = function(passport){
	
	//Serializar a sessão do usuario
	passport.serializeUser(function(inscrito, done){
		done(null, inscrito.id);
	});
	
	//Desserializar a sessao do usuario
	passport.deserializeUser(function(id, done){
		Inscrito.findByPk(id, function(erro, inscrito){
			done(erro, inscrito);
		});
	});
	
	passport.use(new localStrategy({
		
		// Campos que vem do formulario de login com metodo post
		usernameField: 'login',
		passwordField: 'senha'
	},
	function(login, senha, done){
		try{
			// Verifiacar se é cpf ou email
			if(isNaN(login)){
				const inscrito = Inscrito.findOne({where: {'email': login}});
			}
			else{
				const inscrito = Inscrito.findOne({where: {'cpf': login}});
			}
			
			// Se usuario nao existir
			if(!inscrito){
				return done(null, false, {message: "Usuário não Encontrado"});
			}
			
			// Comparação da senha digitada com a senha do banco
			const isValid = bcrypt.compareSync(senha, inscrito.senha);
			if(!isValid){
				return done(null, false, {message: "Senha Incorreta"});
			}
			
			// Deu tudo certo, retorna informações do usuario
			return done(null, inscrito);
		}
		
		catch(erro){
			done(erro, false);
		}
	}));
}