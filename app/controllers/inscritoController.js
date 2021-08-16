'use strict'


const jwt = require('jsonwebtoken');
const index = require('../models/index');
const bcrypt = require('bcrypt');
const autenticador = require('../routes/autenticado');

class InscritoController{



	//<---------- LOGAR -------------->

	//metodo para login
	async login(req, res){
	

		let usuario = {
			login: req.body.login,
			senha: req.body.senha,
		}; 
		// Verifiacar se é cpf ou email
		
		if(isNaN(usuario.login)){
			var logado = await index.Inscritos.findOne({where: {'email': usuario.login}});
		}
		else{
			var logado = await index.Inscritos.findOne({where: {'cpf': usuario.login}});
		}

		if(!logado){
			return res.json({sucess: false, message: "Usuário não Encontrado", statusCode: 200})
			 
		}
		// Comparação da senha digitada com a senha do banco
		const isValid = bcrypt.compareSync(usuario.senha, logado.senha);
		if(!isValid){
			return res.json({sucess: false, message: "Senha Incorreta", statusCode: 200})
			
		}
	
		//gerando token
		var timeInMss = Date.now()
		timeInMss = timeInMss.toString()
		const token = jwt.sign(logado.id, timeInMss);

		//atualizando jwt do usuario
		logado.update(
			{ jwt: token },{ where: { id: logado.id } }
		  )
		// Deu tudo certo, retorna informações do usuario
		
		return res.json({sucess: true, message: "Logado", token: token, statusCode: 200})


	}


	//<---------- EDITAR PERFIL -------------->
	
	async edit_perfil(req, res){
		

		if(req.body.nova_senha){
			let usuario = {
				senha: req.body.nova_senha,
				token: req.body.token,
			};

			//Procurar o id do usuario baseado no token passado
			var id = await autenticador.validar(usuario.token);
			if(!id){
				return res.json({sucess: false, message: "Token não válido", statusCode: 200})	
			}

			//Critografar nova senha
			let nova_senha = await bcrypt.hash(usuario.senha, 8).then(hash => {
				return hash
			});
			
			index.Inscritos.update(
				{ senha: nova_senha },{ where: { id: id } }
			)
			return res.json({sucess: true, message: 'Senha atualizada', statusCode: 200})	
			
			//nova_senha = 123;
			//atualizar as hashs de senha do id encontrado no token
			
		
		}

		let usuario = {
			email: req.body.email,
			nome: req.body.nome,
			token: req.body.token,
		};

		//Procurar o id do usuario baseado no token passado
		var id = await autenticador.validar(usuario.token);
		id = id.id;
		if(!id){
			return res.json({sucess: false, message: "Token não válido", statusCode: 200})	
		}


		//atualizar os dados baseado no que for recebido
		await index.Inscritos.update(
			{ nome: usuario.nome, email:usuario.email },{ where: { id: id } }
		  )
		return res.json({sucess: true, message: 'Dados stualizados', statusCode: 200})	
		

	}













	// Metodo para tratamento da criação de contas
	// Se usuario ja estier cadastrado, retorna erro
	async create(req, res){
		
		// cria um objeto inscrito com as informações mandada pelo form de inscrição
		let newInscrito = {
			nome: req.body.nome,
			cpf: parseInt(req.body.cpf),
			email: req.body.email,
			senha: req.body.senha,
			deficiencia: req.body.deficiencia || null,
			tipo_deficiencia: req.body.tipo_deficiencia || null,
			papel: 3 // 3 é padrao para participante, 2 revisor, 1 adm
		}; 
		
		//console.log(req.body); // Console de testes
		//console.log(newInscrito); // Console de testes
		
		// Busca se ja existe o cpf no banco de dados
		let hasCpf = await index.Inscritos.findOne({
			where: {"cpf": newInscrito.cpf}
		});

		//console.log("Tem cpf? True se não: ", hasCpf === null); // Console de testes
		if(hasCpf){
			res.json({sucess: false, message: 'CPF ja cadastrado'});
		}else{
			//console.log("finalmente Entrou"); // Console de testes
			
			bcrypt.hash(req.body.senha, 8).then(hash => {
				newInscrito.senha = hash;
				
				//console.log("Nova Senha: ", newInscrito.senha); // Console de testes
				
				index.Inscritos.create(newInscrito)
				.then(()=> res.json({sucess: true, message: 'Usuario Criado Com Sucesso', statusCode: 200}))
				.catch((erro)=> res.json({sucess: false, message: 'Falha ao Criar Usuario', statusCode: 500}));
				
			});
		}
	}


	
	async findByCpf(req, res){
		
		let cpf = parseInt(req.params.cpf);
		
		let inscrito = await index.Inscritos.findOne({
			where: {"cpf": cpf}
		}).then(function(inscrito_encontrado){
			
			//console.log(inscrito_encontrado.dataValues); // Console de testes
			//res.json({sucess: true, statusCode: 200});
			
			res.json(inscrito_encontrado);
		}).catch((erro)=> res.json({sucess: false, mesage: "Usuario Nao Encontrado", statusCode: 500}));
		
	}







	

	//<---------- GERENCIAR USUARIOS -------------->


	// Mudar Papeis
	async mudarPapel(req, res) {
		let usuario = {
			id_user: req.body.id_user,
			novo_papel: req.body.novo_papel,
			token: req.body.token,
		};

		//Procurar o id do usuario baseado no token passado
		var user = await autenticador.validar(usuario.token);
		if(!user){
			return res.json({sucess: false, message: "Token não válido", statusCode: 200})	
		}
		if(user.papel !=1){
			return res.json({sucess: false, message: "Somente administradores podem alterar papeis", statusCode: 200})	
		}



		//atualizar os papel baseado no que for recebido
		await index.Inscritos.update(
			{ papel: usuario.novo_papel },{ where: { id: usuario.id_user } }
		  )
		return res.json({sucess: true, message: 'Papel alterado', statusCode: 200})	
		

	}





	//Listar Usuarios
	async list(req, res){
		
		var token = req.body.token;

		//Procurar o id do usuario baseado no token passado
		var user = await autenticador.validar(token);

		
		if(!user){
			return res.json({sucess: false, message: "Token não válido", statusCode: 200})	
		}
		if(user.papel !=1){
			return res.json({sucess: false, message: "Somente administradores podem listar usuarios", statusCode: 200})	
		}



		let lista = []
		let lista_inscrito = await index.Inscritos.findAll()		
		.then(function(inscritos){
			inscritos.forEach((data)=> lista.push(data.dataValues));
			//res.json({sucess: true, statusCode: 200});
			res.json(lista);
		//	console.log(lista_limpa); // Console de testes
		}).catch((erro)=> res.json({sucess: false, mesage: "Lista de Usuarios Vazia", statusCode: 500}));
		
	}
	


	//Deletar usuario
	async remove(req, res){
		let id_user = parseInt(req.body.id_user);
		let token = req.body.token;


		var user = await autenticador.validar(token);		
		if(!user){
			return res.json({sucess: false, message: "Token não válido", statusCode: 200})	
		}
		if(user.papel !=1){
			return res.json({sucess: false, message: "Somente administradores pode deletar usuario", statusCode: 200})	
		}


		await index.Inscritos.destroy({
			where: { 'id': id_user }
		}).then(()=>{
			res.json({sucess: true, statusCode: 200, message: "Deletado com Sucesso"});
		}).catch((erro)=>{res.json({sucess: false, statusCode: 500, message: "Usuario nao Deletado"});});
	}





	// informações usuario
	async info(req, res){
		
		let token = req.body.token;
		

		var user = await autenticador.validar(token);
		if(!user){
			return res.json({sucess: false, message: "Token não válido", statusCode: 200})	
		}
		


		let usuario = await index.Inscritos.findOne({
			where: {"jwt": token}
		}).then(function(inscrito_encontrado){
			
			//console.log(inscrito_encontrado.dataValues); // Console de testes
			//res.json({sucess: true, statusCode: 200});
			
			res.json(inscrito_encontrado);
		}).catch((erro)=> res.json({sucess: false, mesage: "Usuario Nao Encontrado", statusCode: 500}));
		
	}




}

module.exports = InscritoController;