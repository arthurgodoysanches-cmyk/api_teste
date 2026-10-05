const repository = require('../repositories/treinosRepository.js');

function validarTreino(corpo) {
  if (typeof corpo.nome !== 'string' || corpo.nome.trim() === '') {
    return 'O campo nome e obrigatorio e deve ser um texto.';
  }
  // Regra do Exercício 14: maior que zero e no máximo 180 minutos
  if (typeof corpo.duracao !== 'number' || corpo.duracao <= 0 || corpo.duracao > 180) {
    return 'O campo duracao e obrigatorio e deve ser um numero maior que zero.';
  }
  return null;
}

function listarTodos(busca) {
  return repository.listarTodos(busca);
}

function obterResumo() {
  return repository.obterResumo();
}

function buscarPorId(id) {
  return repository.buscarPorId(id);
}

function criarTreino(corpo) {
  const erro = validarTreino(corpo);
  if (erro !== null) {
    return { erro: erro };
  }
  const novo = repository.criar(corpo.nome, corpo.duracao);
  return { treino: novo };
}

function atualizarTreino(id, corpo) {
  const existente = repository.buscarPorId(id);
  if (existente === undefined) {
    return { naoEncontrado: true };
  }
  const erro = validarTreino(corpo);
  if (erro !== null) {
    return { erro: erro };
  }
  const atualizado = repository.atualizar(id, corpo.nome, corpo.duracao);
  return { treino: atualizado };
}

function removerTreino(id) {
  const existente = repository.buscarPorId(id);
  if (existente === undefined) {
    return { naoEncontrado: true };
  }
  repository.remover(id);
  return { removido: true };
}

module.exports = {
  listarTodos,
  obterResumo,
  buscarPorId,
  criarTreino,
  atualizarTreino,
  removerTreino
};