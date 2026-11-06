const bcrypt = require('bcrypt');
const repository = require("../repositories/usuariosRepository.js");

async function login(usuario, senha) {
  const encontrado = repository.buscarPorUsuario(usuario);

  if (encontrado === undefined) {
    return { invalido: true };
  }

  // Compara a senha em texto puro com o hash salvo no banco
  const senhaBate = await bcrypt.compare(senha, encontrado.senha_hash);
  if (!senhaBate) {
    return { invalido: true };
  }

  return { 
    usuario: { id: encontrado.id, usuario: encontrado.usuario } 
  };
}

module.exports = { login };
