🎓 SENAI — Cursos Gratuitos de TI

Projeto de portfólio desenvolvido durante a formação em Desenvolvimento de Sistemas.
A aplicação centraliza cursos gratuitos do SENAI com foco em Cloud, Segurança, Redes, Dados e Programação.

✨ Funcionalidades
🔍 Busca inteligente por nome, área ou descrição
🏷️ Suporte a múltiplas categorias por curso (ex: Cloud + Dados + Segurança)
🎯 Classificação automática baseada em palavras-chave
🧭 Filtros dinâmicos por Área, Status e Modalidade
🖱️ Scroll horizontal nas categorias (drag) para melhor experiência
🌙 Tema Dark/Light com persistência no localStorage
📱 Layout totalmente responsivo (mobile-first)
♿ Acessibilidade com HTML semântico e boas práticas de ARIA
🧠 Diferenciais do Projeto
🔄 Atualização automatizada de cursos via scraping em Python
🧩 Estrutura escalável com dados desacoplados em JSON
🏷️ Sistema de multi-classificação (um curso pode pertencer a várias áreas)
💡 UX aprimorada com drag scroll, animações e badges dinâmicas
🗂️ Estrutura do Projeto

senai-cursos-ti/
├── index.html          # Estrutura da página e filtros
├── README.md           # Documentação
├── css/
│   └── style.css       # Design System, temas e animações
├── js/
│   └── app.js          # Lógica de renderização, busca e filtros
├── data/
│   └── cursos.json     # Base de dados dos cursos
└── scripts/
    └── scraper.py      # Script de coleta e classificação automática
🚀 Como Rodar

Como o projeto utiliza fetch() para carregar o JSON, é necessário um servidor local.

🔹 Opção 1 — VS Code (recomendado)
Instale a extensão Live Server
Clique com o botão direito em index.html
Selecione "Open with Live Server"
🔹 Opção 2 — Terminal
# Python 3
python -m http.server 8000

# Node.js
npx serve .
🔄 Atualização Automática (Scraping)

O projeto utiliza um script em Python para manter a base de dados atualizada.

▶️ Executar script
python scripts/scraper.py
✔ O que o script faz:
Extrai títulos, descrições e carga horária automaticamente
Classifica cursos em múltiplas áreas via palavras-chave
Identifica automaticamente status e modalidade
Atualiza o cursos.json mantendo a estrutura original
➕ Estrutura de um Curso
{
  "id": 110384,
  "nome": "Administração de Sistemas ServiceNow - CSA",
  "areas": ["Programação", "IA", "Certificação"],
  "descricao": "O curso tem por objetivo o desenvolvimento das competências...",
  "cargaHoraria": "32 horas",
  "status": "Disponível",
  "modalidade": "Presencial",
  "link": "https://www.sp.senai.br/curso/administracao-de-sistemas-servicenow-csa/110384",
  "destaque": false
}
🏷️ Categorias Suportadas
☁️ Cloud
🔐 Segurança
🌐 Redes
💻 Programação
📊 Dados
🏗️ Infraestrutura
🤖 IA
🛠️ Tecnologias Utilizadas

Web:

HTML5 semântico
CSS3 (Variables + Grid)
JavaScript (ES6+)

Automação:

Python (BeautifulSoup + Requests)

Persistência:

JSON
LocalStorage
📈 Roadmap
 Deploy no GitHub Pages
 Multi-categorias e destaques
 Filtros por status e modalidade
 Sistema de temas (Dark/Light)
 Favoritar cursos (localStorage)
 Trilhas de estudo personalizadas
 PWA (modo offline)
📦 Versionamento

Este projeto segue o padrão SemVer (Semantic Versioning):

MAJOR.MINOR.PATCH
Ex: 1.2.0 — adição de filtros de modalidade e status
👤 Autor

Davi Robson
🎓 Estudante de Desenvolvimento de Sistemas
🎯 Foco em Infraestrutura, Cloud e Segurança

🔗 GitHub: https://github.com/Bit-Davirlc

📌 Observações
Dados baseados nos cursos gratuitos do portal SENAI SP
Classificação automatizada via análise de strings no scraper
Projeto com foco em demonstrar habilidades de Front-end e integração de dados

⭐ Se este projeto te ajudou, considere dar um star no repositório!
