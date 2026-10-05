const service = require('../services/treinosService.js');

function listar(req, res) {
  const { busca } = req.query;
  const treinos = service.listarTodos(busca);
  res.status(200).json(treinos);
}

function obterResumo(req, res) {
  const resumo = service.obterResumo();
  res.status(200).json(resumo);
}

function buscarUm(req, res) {
  const idParam = req.params.id;

  // Valida se o ID fornecido é um número inteiro válido (Desafio 12)
  if (!/^\d+$/.test(idParam)) {
    return res.status(400).json({ erro: 'O ID fornecido deve ser um numero inteiro valido.' });
  }

  const id = Number(idParam);
  const treino = service.buscarPorId(id);
  if (treino === undefined) {
    return res.status(404).json({ erro: 'Treino nao encontrado.' });
  }
  res.status(200).json(treino);
}

function criar(req, res) {
  const resultado = service.criarTreino(req.body);
  if (resultado.erro !== undefined) {
    return res.status(400).json({ erro: resultado.erro });
  }
  res.status(201).json(resultado.treino);
}

function atualizar(req, res) {
  const id = Number(req.params.id);
  const resultado = service.atualizarTreino(id, req.body);
  if (resultado.naoEncontrado === true) {
    return res.status(404).json({ erro: 'Treino nao encontrado.' });
  }
  if (resultado.erro !== undefined) {
    return res.status(400).json({ erro: resultado.erro });
  }
  res.status(200).json(resultado.treino);
}

function remover(req, res) {
  const id = Number(req.params.id);
  const resultado = service.removerTreino(id);
  if (resultado.naoEncontrado === true) {
    return res.status(404).json({ erro: 'Treino nao encontrado.' });
  }
  res.status(204).end();
}

module.exports = {
  listar,
  obterResumo,
  buscarUm,
  criar,
  atualizar,
  remover
};