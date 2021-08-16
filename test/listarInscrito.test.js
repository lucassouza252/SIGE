'use strict';
const app = require('../server');
const request = require('supertest');
const expect = require('chai').expect;
const index = require('../app/models/index');
const chai = require('chai');
const chaihttp = require('chai-http');

chai.use(chaihttp);

describe("Teste de Lista Inscritos", function(){
	
	let restoken = "eyJhbGciOiJIUzI1NiJ9.Mg.LJme3HvAR8Vmue74BsGwW5amCt7G8Vw96QGxsVCV8kI"

	after(async function(){
		await app.close();
	});
	
	describe("Test de post /gerenciar_user/listar", function(){
		it("Status Code", async function(done){
			
			const dados = {
				token: restoken,
			}
		
			await request(app)
			.post('/gerenciar_user/listar')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.send(dados)
			.expect(200)
			.then(done());
		});
	});	
});