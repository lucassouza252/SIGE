'use strict';
const app = require('../server');
const request = require('supertest');
const expect = require('chai').expect;
const index = require('../app/models/index');
const chai = require('chai');
const chaihttp = require('chai-http');

chai.use(chaihttp);

describe("Teste de Evento", function(){
	
	let restoken = "eyJhbGciOiJIUzI1NiJ9.Mg.LJme3HvAR8Vmue74BsGwW5amCt7G8Vw96QGxsVCV8kI"

	after(async function(){
		index.Eventos.destroy({where: {sigla: "DQ"}});
		await app.close();
	});
	
	describe("Test de post /evento/new", function(){
		it("Status Code", async function(done){
			
			const dados = {
				token: restoken,
				nome: "Teste Evento",
				url: "http://evento.com.br",
				instituicao: "URFB PORRA",
				maximo_inscritos: '20',
				sigla: "DQ",
				virtual: true,
				descricao: "Aqui vem uma descricao",
				submissao: true,
				inicio_evento: "1900-01-01",
				fim_evento: "1901-01-01",
				inicio_submissao: "1900-01-01",
				fim_submissao: "1901-01-01",
				inicio_revisao: "1900-01-01",
				fim_revisao: "1901-01-01"
			}
		
			await request(app)
			.post('/evento/new')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.send(dados)
			.expect(200)
			.then(done());
		});
	});	
});