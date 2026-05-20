const db = require('../config/db');

module.exports = {
  async create(req, res, next) {
    try {
      const { titulo, objetivo, ementa, data_prevista, disciplina, conteudos, recursos_apoio, tags } = req.body;

      const query = `INSERT INTO planos_aula (titulo, objetivo, ementa, data_prevista, disciplina, conteudos, recursos_apoio, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      
      const [result] = await db.query(query, [titulo, objetivo, ementa, data_prevista, disciplina, conteudos, recursos_apoio, tags]);

      return res.status(201).json({ id: result.insertId, ...req.body });

    } catch (err) {
      next(err); 
    }
  },

 async getAll(req, res, next) {
    try {
      let { page = 1, limit = 5, disciplina, tags, data_prevista, titulo, sort = 'created_at' } = req.query;
      page = parseInt(page); limit = parseInt(limit);
      const offset = (page - 1) * limit;

      let query = `SELECT * FROM planos_aula WHERE 1=1`;
      let queryCount = `SELECT COUNT(*) as total FROM planos_aula WHERE 1=1`;
      let queryParams = [];

      if (disciplina) { 
        query += ` AND disciplina LIKE ?`; 
        queryCount += ` AND disciplina LIKE ?`; 
        queryParams.push(`%${disciplina}%`); 
      }
      if (data_prevista) { 
        query += ` AND data_prevista = ?`; 
        queryCount += ` AND data_prevista = ?`; 
        queryParams.push(data_prevista); 
      }
      if (tags) { 
        query += ` AND tags LIKE ?`; 
        queryCount += ` AND tags LIKE ?`; 
        queryParams.push(`%${tags}%`); 
      }
      if (titulo) { 
        query += ` AND titulo LIKE ?`; 
        queryCount += ` AND titulo LIKE ?`; 
        queryParams.push(`%${titulo}%`); 
      }

      const ordenacoesPermitidas = {
        'titulo': 'titulo ASC',      
        'created_at': 'created_at DESC' 
      };

      const direcaoOrdenacao = ordenacoesPermitidas[sort] || 'created_at DESC';

      query += ` ORDER BY ${direcaoOrdenacao} LIMIT ? OFFSET ?`;

      const [countResult] = await db.query(queryCount, queryParams);
      const [dataResult] = await db.query(query, [...queryParams, limit, offset]);

      return res.json({
        totalItems: countResult[0].total,
        totalPages: Math.ceil(countResult[0].total / limit),
        currentPage: page,
        data: dataResult
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { titulo, objetivo, ementa, data_prevista, disciplina, conteudos, recursos_apoio, tags } = req.body;
      const query = `UPDATE planos_aula SET titulo = ?, objetivo = ?, ementa = ?, data_prevista = ?, disciplina = ?, conteudos = ?, recursos_apoio = ?, tags = ? WHERE id = ?`;

      const [result] = await db.query(query, [titulo, objetivo, ementa, data_prevista, disciplina, conteudos, recursos_apoio, tags, id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Plano de aula não encontrado.' });

      return res.json({ id, ...req.body });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const [result] = await db.query('DELETE FROM planos_aula WHERE id = ?', [id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Plano de aula não encontrado.' });
      return res.json({ message: 'Plano de aula excluído com sucesso!' });
    } catch (err) {
      next(err);
    }
  }
};