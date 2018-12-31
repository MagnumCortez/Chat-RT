module.exports.iniciaChat = function(application, req, res) {
	var formData = req.body;

	req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty();
	req.assert('apelido', 'Nome ou apelido deve conter entre 3 e 15 caracteres').len(3, 15);

	var errors = req.validationErrors();

	if (errors) {
		res.render("index", {validacao : errors});
		return;
	}

	/* pegando variável global e emitindo um evento de msg para o cliente */
	application.get('io').emit('msgToClient', { 
		name : formData.apelido, 
		message : 'Acabou de entrar no chat!'
	});

	res.render("chat", {formData : formData});
}