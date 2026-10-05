const service = require('./services/treinosService.js');

console.log('--- Listar todos ---');
console.log(service.listarTodos());

console.log('\n--- Criar treino válido ---');
console.log(service.criarTreino({ nome: 'Teste sem servidor', duracao: 15 }));

console.log('\n--- Teste erro de nome ---');
console.log(service.criarTreino({ nome: '', duracao: 15 }));

console.log('\n--- Teste erro de duração > 180 min (Exercício 14) ---');
console.log(service.criarTreino({ nome: 'Treino Longo', duracao: 200 }));