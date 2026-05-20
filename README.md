# 📚 Sistema de Gestão de Planos de Aula com IA (Smart Assist)

👉 [Assistir ao Vídeo de Apresentação do Projeto](https://youtu.be/58NgYDDXKkM)

Status: Desenvolvimento

![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

Sistema full-stack para criação, listagem, edição e exclusão de planos de aula, equipado com um assistente pedagógico inteligente integrado à API da Groq (Llama 3.1) para geração automática de conteúdos e tags. O projeto foi desenvolvido aplicando conceitos modernos de componentização, arquitetura limpa, consumo de API e estilização isolada.

---

# 📌 Funcionalidades

✅ Criar planos de aula  
✅ Listar planos de aula  
✅ Atualizar planos de aula  
✅ Deletar planos de aula  
✅ Assistente IA (Smart Assist)  
✅ Filtros avançados combinados (Título, Disciplina, Tags e Data)  
✅ Ordenação dinâmica (Mais recentes ou Ordem alfabética)  
✅ Paginação dinâmica controlada pelo backend  
✅ Estilização isolada com CSS Modules (Zero CSS Inline)  
✅ Validação rigorosa de dados com Joi  
✅ Arquitetura com Separação de Conceitos (SoC)
✅ Integração com Inteligência Artificial, Assistente Pedagógico via Groq API: Integração com o modelo LLM (llama-3.1-8b-instant) para gerar sugestões valiosas para os professores.
✅Containerização Completa: O projeto todo (Frontend em Vite/React, Backend em Node.js e Banco MySQL) sobe com um único comando usando Docker e Docker Compose.
✅Resiliência e Auto-Recovery: O Backend possui um sistema de Retry automático na inicialização para aguardar o MySQL ficar "saudável" (healthy), evitando quedas no servidor (ECONNREFUSED).
✅Observabilidade e Logs Estruturados: Monitoramento rigoroso das chamadas de Inteligência Artificial, gerando logs automáticos no terminal com o Título, Disciplina, Uso de Tokens e Latência (em segundos).
✅Health Check: Endpoint /health dedicado para checagem do status e uptime (tempo de atividade) do servidor, ideal para deploys na nuvem.
---

# 🏗️ Arquitetura e Boas Práticas

O projeto foi estruturado seguindo padrões rigorosos de mercado para garantir manutenibilidade e escalabilidade:
- **Separação de Conceitos (SoC):** Divisão clara no backend entre Rotas, Controllers, Services, Validators e Middlewares. No frontend, separação estrita entre Páginas (Pages) e Componentes reutilizáveis (Components).
- **Middleware Global de Erros:** Centralização do tratamento de exceções da API para evitar vazamento de stack traces e padronizar respostas de erro.
- **Observabilidade Básica:** Logs estruturados no backend mensurando a latência da requisição e o consumo de tokens da IA.
- **Validação na Camada de Entrada:** Uso do Joi para garantir a integridade e o formato dos dados antes que eles atinjam as rotas e o banco de dados.

---

# 🛠 Tecnologias utilizadas

### Backend
- **Node.js** com **Express** (Arquitetura REST)
- **MySQL** (Banco de dados relacional com pooling de conexões)
- **Groq SDK** (Integração com LLM Llama-3.1-8b-instant)
- **Joi** (Validação robusta de esquemas de dados)

### Frontend
- **React** (Vite)
- **Axios** (Consumo de API HTTP)
- **React Router Dom** (Gerenciamento de rotas SPA)
- **CSS Modules** (Estilização isolada e modular)

---

# 📂 Estrutura do projeto

```bash
smart-planner-ai/               
├── backend/                    
│   ├── config/
│   │   └── db.js               
│   ├── controllers/            
│   ├── routes/                 
│   ├── services/               
│   ├── .env                    
│   ├── Dockerfile              
│   ├── package.json            
│   └── server.js               
│
├── frontend/                   
│   ├── src/
│   │   ├── components/        
│   │   ├── pages/             
│   │   ├── App.jsx             
│   │   └── main.jsx            
│   ├── Dockerfile              
│   ├── package.json           
│   └── vite.config.js          
│
├── .gitignore                  
├── docker-compose.yml          
├── README.md                   
└── .env

⚙️ Instalação e Configuração

1. Clone o repositório
Bash
git clone [https://github.com/seu-usuario/smart-lesson-planner.git](https://github.com/seu-usuario/smart-lesson-planner.git)
cd smart-lesson-planner
2. Configuração do Banco de Dados
Crie a tabela necessária no seu servidor MySQL local:

SQL
CREATE TABLE planos_aula (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    disciplina VARCHAR(100) NOT NULL,
    objetivo TEXT NOT NULL,
    ementa TEXT NOT NULL,
    data_prevista DATE NOT NULL,
    conteudos TEXT,
    recursos_apoio TEXT,
    tags VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
3. Configuração do Backend
Entre na pasta do backend e instale as dependências:

Bash
cd backend
npm install
Crie um arquivo .env na raiz da pasta backend/ seguindo o padrão do .env.example:

Snippet de código
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
GROQ_API_KEY=sua_chave_da_groq
Inicie o servidor do backend em modo de desenvolvimento:

Bash
npm run dev
4. Configuração do Frontend
Em um novo terminal, entre na pasta do frontend e instale as dependências:

Bash
cd frontend
npm install
Rode o projeto em modo de desenvolvimento:

Bash
npm run dev
O frontend consome nativamente a API REST local rodando na porta: http://localhost:3000

## 🐳 Por que usei Docker?
Este projeto usa Docker para garantir que **funcione em qualquer computador** sem problemas de configuração.

Com Docker você **não precisa instalar**:
- ❌ Node.js
- ❌ MySQL
- ❌ Configurar portas
- ❌ Criar banco de dados manualmente

**Apenas 1 comando e tudo funciona! 🚀**

---

## 📋 O que você precisa instalar

### 1. Instalar Docker Desktop

#### Windows:
1. Baixe: [Docker Desktop para Windows](https://www.docker.com/products/docker-desktop)
2. Execute o instalador
3. Reinicie o computador
4. Abra o Docker Desktop

#### Mac:
1. Baixe: [Docker Desktop para Mac](https://www.docker.com/products/docker-desktop)
2. Arraste para a pasta Applications
3. Abra o Docker Desktop

#### Linux:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

📌 Detalhes das Funcionalidades
📥 Criar e Editar planos de aula
Cadastro completo contendo campos obrigatórios de identificação e escopo pedagógico.

Reaproveitamento inteligente do mesmo formulário estruturado tanto para fluxos de criação quanto para atualização.

Tratamento unificado de datas para evitar inconsistências de fuso horário entre o banco e a tela.

🤖 Smart Assist (Preenchimento com IA)
Ao fornecer Título, Disciplina e Ementa, o botão dispara uma análise semântica assíncrona para a API da Groq.

O retorno estruturado preenche instantaneamente os campos de conteúdos programáticos (tópicos), referências de apoio e gera as tags automáticas para classificação.

📋 Listagem com Filtros e Paginação
Renderização altamente performática baseada em paginação computada diretamente via banco de dados (LIMIT e OFFSET).

Filtros cumulativos em tempo real que permitem pesquisar simultaneamente por palavras no título, nome da disciplina, tags específicas e data prevista.

🎨 Interface
O projeto preza pelo isolamento estrito de estilo através de CSS Modules, eliminando completamente o uso de CSS inline e classes globais conflitantes:

Componentes totalmente desacoplados de estilo global.

Estados visuais reativos para botões ativos, em estado de carregamento (loading) ou desativados (disabled).

Feedback visual para tabelas vazias integrado diretamente ao fluxo de dados.

📚 Aprendizados
Nesse projeto foi praticado de forma intensiva:

React Avançado: Fluxo de dados estruturado unidirecional, componentização limpa e passagem eficiente de propriedades (props).

Clean Architecture: Desacoplamento de responsabilidades entre regras de visualização (Frontend), regras de validação (Joi) e regras de negócio/integrações (Services/Groq).

Engenharia de Prompt: Construção de instruções estruturadas (System Prompts) para forçar o modelo de linguagem a retornar esquemas JSON estáveis e limpos.

Segurança de Credenciais: Uso de arquivos .gitignore e .env.example para impedir a exposição de dados sensíveis em repositórios públicos.

👨‍💻 Autor
feito por Iraquitan Ítalo Da Silva Santos

LinkedIn: https://www.linkedin.com/in/iraquitan-ítalo-da-silva-santos-212001229

GitHub: https://github.com/iraquitan-italo