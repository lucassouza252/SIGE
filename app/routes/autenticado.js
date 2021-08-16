'use strict'


const index = require('../models/index');


module.exports = {
	
	async validar(token){
	
		//console.log(token)
		var user = await index.Inscritos.findOne({where: {'jwt': token}});
		if(!user){
			return null;
		}
		return user;
	}


}

