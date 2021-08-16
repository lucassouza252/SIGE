'use strict';
const app = require('../server');
const request = require('supertest');
const expect = require('chai').expect;

describe("Teste de Servidor", function(){
	after(async function(){
		await app.close();
	});
	
	describe("Test de get /", function(){
		it("Status Code", async function(){
			const res = await request(app).get('/');
			expect(res.status).to.equal(200);
		});
	});	
});