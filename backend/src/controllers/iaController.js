const iaService = require('../services/iaServices');

module.exports = {
  async gerarRecomendacoes(req, res, next) {
    const { titulo, disciplina, ementa } = req.body;

    if (!titulo || !disciplina || !ementa) {
      return res.status(400).json({ error: 'Título, disciplina e ementa são obrigatórios para a IA.' });
    }

    const inicioTempo = Date.now();

    try {

      const { dadosIA, tokens } = await iaService.gerarSugestoesPedagogicas(titulo, disciplina, ementa);

      const fimTempo = Date.now();
      const latência = ((fimTempo - inicioTempo) / 1000).toFixed(1);

      console.log(`[INFO] AI Request: Title="${titulo}", Discipline="${disciplina}", TokenUsage=${tokens}, Latency=${latência}s.`);

      return res.json(dadosIA);
    } catch (err) {
      next(err);
    }
  }
};