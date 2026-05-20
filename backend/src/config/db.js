const mysql = require('mysql2');
require('dotenv').config();


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3307,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const iniciarBanco = async () => {
  try {
    const conexao = await pool.promise().getConnection();
    console.log('✅ Conexão com o MySQL realizada com sucesso!');
    
    const queryTabela = `
      CREATE TABLE IF NOT EXISTS planos_aula (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        objetivo TEXT NOT NULL,
        ementa TEXT NOT NULL,
        data_prevista DATE NOT NULL,
        disciplina VARCHAR(100) NOT NULL,
        conteudos TEXT,
        recursos_apoio TEXT,
        tags VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await conexao.query(queryTabela);
    console.log('📅 Tabela "planos_aula" verificada/criada com sucesso!');
    conexao.release();
  } catch (err) {
    console.error('❌ Erro ao inicializar o banco de dados:', err.message);
  }
};

iniciarBanco();

module.exports = pool.promise();