const Groq = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const gerarSugestoesPedagogicas = async (titulo, disciplina, ementa) => {
  const inicio = Date.now();
  const promptSystem = `Você é um Assistente Pedagógico experiente e especialista em design instrucional.
  Sua resposta DEVE ser estritamente um objeto JSON válido, sem qualquer texto explicativo fora dele, contendo exatamente a seguinte estrutura:
  {
    "conteudos_complementares": "Texto com sugestões teóricas, referências de livros ou artigos para o professor.",
    "topicos_relacionados": "Lista em texto corrido de subtemas importantes para abordar nessa aula.",
    "tags": "Exatamente 3 tags relevantes separadas por vírgula."
  }`;

  const promptUser = `Com base na aula:
  - Título: "${titulo}"
  - Disciplina: "${disciplina}"
  - Ementa/Resumo: "${ementa}"
  Gere as recomendações pedagógicas.`;

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: promptSystem },
      { role: 'user', content: promptUser }
    ],
    model: 'llama-3.1-8b-instant',
    response_format: { type: "json_object" }
  });

  const fim = Date.now();
  const latencia = ((fim - inicio) / 1000).toFixed(1);
  const tokens = chatCompletion.usage?.total_tokens || 0;

  console.log(`[INFO] AI Request: Title="${titulo}", Discipline="${disciplina}", TokenUsage=${tokens}, Latency=${latencia}s.`);
  
  return {
    dadosIA: JSON.parse(chatCompletion.choices[0].message.content),
    tokens: chatCompletion.usage?.total_tokens || 0
  };
};

module.exports = { gerarSugestoesPedagogicas };