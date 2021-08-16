'use strict';
const app = require('../server');
const request = require('supertest');
const expect = require('chai').expect;
const index = require('../app/models/index');
const chai = require('chai');
const chaihttp = require('chai-http');

chai.use(chaihttp);

describe("Teste de Cadastro", function(){
	after(async function(){
		index.Inscritos.destroy({where: {'cpf':12345678900}});
		await app.close();
	});
	
	describe("Test de Criar Conta", function(){
		it("Status Code", async function(done){
			const dados = {
				nome: "Testador Mocha",
				email: "testador@gmail.com",
				cpf: "12345678900",
				senha: '12345'
			}
			
			await request(app)
			.post('/cadastro')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.send(dados)
			.expect(200)
			.then(done());
			
		});
	});	
});