'use strict';
const app = require('../server');
const request = require('supertest');
const expect = require('chai').expect;
const index = require('../app/models/index');
const chai = require('chai');
const chaihttp = require('chai-http');

chai.use(chaihttp);

describe("Teste de Submissoes", function(){
	after(async function(){
		index.Submissoes.destroy({where: {nome: "Testador"}});
		await app.close();
	});
	
	let restoken = "eyJhbGciOiJIUzI1NiJ9.Mg.LJme3HvAR8Vmue74BsGwW5amCt7G8Vw96QGxsVCV8kI"
	
	describe("Test de Criar Submissao", function(){
		it("Status Code", async function(done){
			const dados = {
				"token": restoken,
				"titulo": "Testador",
				"texto": "texto teste",
				"palavra_chave": "teste fazendo teste2",
				"autores": ["Rafael Brito", "Andre Andrade"],
				"cpf_orientador": 345566432,
				"mensagem_apoio": "teste de apoio",
				"tipo_apresentacao": "teste de tipo de apresentação",
				"area_conhecimento":"teste",
				"feedback": "",
				"eventoId":10,
				"trilhaId":2,
				"respostas":[
				{
					"perguntaId":1,
					"resposta_aberta":"respondendo um teste",
					"resposta_radio":""
				},{
					"perguntaId":2,
					"resposta_aberta":"",
					"resposta_radio":"azul"
				}]
			}
			
			await request(app)
			.post('/submissao/enviar')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.send(dados)
			.expect(200)
			.then(done());
			
		});
	});	
});