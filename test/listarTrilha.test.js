'use strict';
const app = require('../server');
const request = require('supertest');
const expect = require('chai').expect;
const index = require('../app/models/index');
const chai = require('chai');
const chaihttp = require('chai-http');

chai.use(chaihttp);

describe("Teste de Lista Trilhas", function(){

	after(async function(){
		await app.close();
	});
	
	describe("Test de post /submissao/trilha/listar", function(){
		it("Status Code", async function(done){
			
			const dados = {
				eventoId: 10
			}
		
			await request(app)
			.post('/submissao/trilha/listar')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.send(dados)
			.expect(200)
			.then(done());
		});
	});	
});