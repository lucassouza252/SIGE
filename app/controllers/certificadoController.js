'use strict';
const index = require('../models/index');
const autenticador = require('../routes/autenticado');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');
const libre = require('libreoffice-convert-win');
const md5 = require('md5');

class CertificadoController{
	
	async listar(req, res){
		
		var dados = {
			token: req.body.token
		}

		var user = await autenticador.validar(dados.token);
		if(!user){
			return res.json({sucess: false, message: "Token não válido", statusCode: 200})	
		}
	

		var userId = user.id

		var certificados_list = [];
		var model_list = [];
		var trilha_list = [];
		
		var event_list = [];
		var sub_list = [];
		console.log('aqui ok')


		certificados_list = await index.Certificados.findAll({attributes:['id','codigo', 'inscritoId', 'modeloId', 'trilhaId'],
		where: {"inscritoId": userId},
		include: {model: index.CertificadoConfiguracoes, as: 'modelo'}});
	

	
		var id_model_list=certificados_list.map(teste=>teste.modeloId)
		model_list = await index.CertificadoConfiguracoes.findAll({where: {"id": id_model_list}})


		var id_event_list=model_list.map(teste=>teste.eventoId)
		await id_event_list.map((evento,i)=>{
			event_list[i] = index.Eventos.findAll({where: {"id": evento}})
		})
		 
			
		
		var id_trilha_list=certificados_list.map(teste=>teste.trilhaId)
		trilha_list = await index.Trilhas.findAll({where: {"id": id_trilha_list}})
		

		
		sub_list = await index.Submissoes.findAll({where: {"inscritoId":userId,"trilhaId": id_trilha_list}})
		
	
	
		var enviar = []

		certificados_list.map((cert,i)=>{
			enviar.push({
				id:certificados_list[i].id,
				nome_evento: "Evento",
				codigo: certificados_list[i].codigo,
				participante:sub_list[i].tipo_apresentacao
			
			})
		})

		
			return res.json(enviar)
		
	
		}
		
		//console.log()
		// res.json(user.nome)
/*
		 certificados_list.map( async (certificado,i)=>{


			let newCertificado = {
				nome_inscrito: user.nome, // Nome do inscrito
				tipo_apresentacao_inscrito: sub_list[i].tipo_apresentacao, // Tipo da Apresentacao da Submissao
				nome_submissao: sub_list[i].titulo, // titulo da submissao
				nome_autores: sub_list[i].autores, // Nome dos autores na submissao
				codigo_certificado: md5(sub_list[i].id+dados.token) // Um codigo gerado usando alguma coisa das informaçoes
			};
			

			//modificando doc
			let content = await fs.readFileSync(
				path.resolve(__dirname, "../certificado_modelo/modelo/" + model_list[i].nome_modelo), 'binary');
			
				let zip = new PizZip(content);
				let doc;
				try{
					doc = new Docxtemplater(zip);
				}
				catch(erro){
					console.log("Deu Erro: ",erro);
				}
				
				doc.setData(newCertificado);
				
				try{
					doc.render();
				}
				catch(erro){
					console.log("Deu Erro: ",erro);
				}
				
				let buf = doc.getZip().generate({type: 'nodebuffer'});
				fs.writeFileSync(
					path.resolve(__dirname,"../certificado_modelo/emitido/"+newCertificado.codigo_certificado+'.docx'), buf);
			// Fim modificar o docx

			

	async function createPDFExample(nome) {

	// Inicio Docx pra PDF
		const docxPath = path.resolve(__dirname,"../certificado_modelo/emitido/"+nome+'.docx');
		const pdfPath = path.resolve(__dirname,"../certificado_modelo/emitido/"+nome+'.pdf');
		const docx = fs.readFileSync(docxPath);
		
		libre.convert(docx, '.pdf', undefined, function(erro, resultado){
			if(erro){
				console.log("Deu erro aqui parca: ", erro);
			}
			else{
				fs.writeFileSync(pdfPath, resultado);
				res.json({sucess: true, statusCode: 200});
			}
		});
		
		
		// Fim do Docx pra PDF

	}
	createPDFExample(newCertificado.codigo_certificado) 
			//console.log(content)

		 })

*/


		






	async gerar(req,res){
		// Inicio Modificar o docx
		
		

		let id_certificado = req.body.id_certificado;
		let token = req.body.token

		var user = await autenticador.validar(token);
		if(!user){
			return res.json({sucess: false, message: "Token não válido", statusCode: 200})	
		}
		

		var certificado = await index.Certificados.findOne(
			{attributes:['id','codigo', 'inscritoId', 'modeloId', 'trilhaId'],
			where: {"id": id_certificado}});

		var modelo = await index.CertificadoConfiguracoes.findOne({where: {"id": certificado.modeloId}})
		


		var trilha = await index.Trilhas.findOne({where: {"id": certificado.trilhaId}})
		
		
		
		var submissao = await index.Submissoes.findOne({where: {"inscritoId":user.id,"trilhaId": trilha.id}})
		
		

		var newCertificado = {
			nome_inscrito: user.nome, // Nome do inscrito
			tipo_apresentacao_inscrito: submissao.tipo_apresentacao, // Tipo da Apresentacao da Submissao
			nome_submissao: submissao.titulo, // titulo da submissao
			nome_autores: submissao.autores, // Nome dos autores na submissao
			codigo_certificado: md5(submissao.id+token) // Um codigo gerado usando alguma coisa das informaçoes
		};
		

		//verificando se certificado existe
		if(fs.existsSync(
			path.resolve(__dirname, "../certificado_modelo/emitido/" + newCertificado.codigo_certificado+".pdf"), 'binary'
			)){
				//console.log('EXISTEEE')

				res.json({sucess: true, statusCode: 200, link:'/certificado/'+newCertificado.codigo_certificado});




			}else{
				
				
				let content = fs.readFileSync(
					path.resolve(__dirname, "../certificado_modelo/modelo/" + modelo.nome_modelo), 'binary');
				
					let zip = new PizZip(content);
					let doc;
					try{
						doc = new Docxtemplater(zip);
					}
					catch(erro){
						console.log("Deu Erro: ",erro);
					}
					
					doc.setData(newCertificado);
					
					try{
						doc.render();
					}
					catch(erro){
						console.log("Deu Erro: ",erro);
					}
					
					let buf = doc.getZip().generate({type: 'nodebuffer'});
					fs.writeFileSync(
						path.resolve(__dirname,"../certificado_modelo/emitido/"+newCertificado.codigo_certificado+'.docx'), buf);
				// Fim modificar o docx


						
				// Inicio Docx pra PDF
				const docxPath = path.resolve(__dirname,"../certificado_modelo/emitido/"+newCertificado.codigo_certificado+'.docx');
				const pdfPath = path.resolve(__dirname,"../certificado_modelo/emitido/"+newCertificado.codigo_certificado+'.pdf');
				const docx = fs.readFileSync(docxPath);
				
				libre.convert(docx, '.pdf', undefined, function(erro, resultado){
					if(erro){
						console.log("Deu erro aqui: ", erro);
					}
					else{
						fs.writeFileSync(pdfPath, resultado);
						res.json({sucess: true, statusCode: 200, link:'/certificado/'+newCertificado.codigo_certificado});
					}
				});
				
				// Fim do Docx pra PDF
				

				//Excluir docx
				fs.unlinkSync(path.resolve(__dirname, "../certificado_modelo/emitido/" + newCertificado.codigo_certificado+".docx"), 'binary'
				)







			}
	
		
	
	  

	







	//	const existe = path.resolve(__dirname,);
	


		//modificando doc
	


		
	}


	async view(req,res){

		

		


		var caminho = path.join(__dirname, `../certificado_modelo/emitido/${req.params.codigo}.pdf`)

		var pdf = fs.readFileSync(caminho);

		res.writeHead(200, {'Content-Type': 'application/pdf' });
		res.end(pdf, 'binary');


	}

}

module.exports = CertificadoController;