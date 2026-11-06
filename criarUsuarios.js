const bcrypt = require('bcrypt');
const db = require('./banco.js');

async function criarUsuariosDeTeste() {
  // Gerando os hashes de forma assíncrona
  const senhaDiego = await bcrypt.hash('1234', 10);
  const senhaAluno = await bcrypt.hash('senha', 10);

  const inserir = db.prepare(
    'INSERT INTO usuarios (usuario, senha_hash) VALUES (?, ?)'
  );

  inserir.run('diego', senhaDiego);
  inserir.run('aluno', senhaAluno);
}

criarUsuariosDeTeste()
  .then(() => {
    console.log('Usuarios criados com hash com sucesso.');
    process.exit(0);
  })
  .catch((erro) => {
    console.error('Nao foi possivel criar usuarios:', erro);
    process.exit(1);
  });
