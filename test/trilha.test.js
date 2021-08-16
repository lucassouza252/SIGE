'use strict';
const app = require('../server');
const request = require('supertest');
const expect = require('chai').expect;
const index = require('../app/models/index');
const chai = require('chai');
const chaihttp = require('chai-http');

chai.use(chaihttp);

describe("Teste de Trilha", function(){
	after(async function(){
		index.Trilhas.destroy({where: {nome: "Tester"}});
		await app.close();
	});
	
	let restoken = "eyJhbGciOiJIUzI1NiJ9.Mg.LJme3HvAR8Vmue74BsGwW5amCt7G8Vw96QGxsVCV8kI"
	
	describe("Test de Criar Trilha", function(){
		it("Status Code", async function(done){
			const dados = {
				"token": restoken,
				"nome": "Tester",
				"eventoId": 1,
				"perguntas":[
				{
					"pergunta":"fhihihi",
					"opcaoPergunta":true,
					"campo_um":"",
					"campo_dois":""
				},{
					"pergunta":"outro teste de trilha",
					"opcaoPergunta":false,
					"campo_um":"sim",
					"campo_dois":"não"
				}]
	
			}
			
			await request(app)
			.post('/evento/trilha/new')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.send(dados)
			.expect(200)
			.then(done());
			
		});
	});	
});