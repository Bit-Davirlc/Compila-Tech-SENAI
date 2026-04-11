# 🎓 SENAI — Cursos Gratuitos de TI

> Projeto de portfólio desenvolvido como estudante de Desenvolvimento de Sistemas.
> Plataforma que centraliza cursos gratuitos do SENAI com foco em **Cloud, Segurança, Redes, Dados e Programação**.

---

## ✨ Funcionalidades

* 🔍 **Busca inteligente** por nome, área ou descrição
* 🏷️ **Multi-categorias por curso** (ex: Cloud + Dados + Segurança)
* 🎯 **Classificação automática** baseada em palavras-chave
* 🧭 **Filtros dinâmicos** por Área, Status e Modalidade
* 🖱️ **Scroll horizontal nas categorias (drag)** para melhor UX
* 🌙 **Tema Dark/Light** com persistência no `localStorage`
* 📱 **Totalmente responsivo** (mobile-first)
* ♿ **Acessível** — uso de HTML semântico e boas práticas de ARIA

---

## 🧠 Diferenciais do Projeto

* 🔄 **Atualização automatizada de cursos (scraping)** via Python
* 🧩 Estrutura preparada para crescimento (dados desacoplados em JSON)
* 🏷️ Sistema de **multi-classificação** (um curso pode pertencer a várias áreas)
* 💡 UX aprimorada (drag scroll, animações de entrada e badges dinâmicas)

---

## 🗂️ Estrutura do Projeto

```text
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
Por usar fetch() para carregar o JSON, é necessário um servidor local.

🔹 Opção 1 — VS Code (recomendado)
Instale a extensão Live Server

Clique com botão direito em index.html

Selecione "Open with Live Server"

🔹 Opção 2 — Terminal
Bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .
🔄 Atualização Automática (Scraping)
O projeto utiliza um script em Python para manter a base de dados atualizada.

▶️ Executar script:
Bash
python scripts/scraper.py
✔ Extrai títulos, descrições e carga horária automaticamente

✔ Classifica o curso em múltiplas áreas via palavras-chave

✔ Identifica automaticamente o status e modalidade

✔ Atualiza o cursos.json mantendo a estrutura original

➕ Estrutura de um Curso
JSON
{
  "id": 110384,
  "nome": "Administração de Sistemas ServiceNow - CSA",
  "areas": [
    "Programação",
    "IA",
    "Certificação"
  ],
  "descricao": "O curso de aperfeiçoamento profissional Administração de Sistemas ServiceNow - CSA tem por objetivo o desenvolvimento das competências relativas à utilização e aplicação dos serviços fundamentais da plataforma ServiceNow...",
  "cargaHoraria": "32 horas",
  "status": "Disponível",
  "modalidade": "Presencial",
  "link": "[https://www.sp.senai.br/curso/administracao-de-sistemas-servicenow-csa/110384](https://www.sp.senai.br/curso/administracao-de-sistemas-servicenow-csa/110384)",
  "destaque": false
}
```
🏷️ Categorias Suportadas
☁️ Cloud

🔐 Segurança

🌐 Redes

💻 Programação

📊 Dados

🏗️ Infraestrutura

🤖 IA

🛠️ Tecnologias Utilizadas
Web: HTML5 semântico, CSS3 (Variables + Grid), JavaScript (ES6+)

Automação: Python (BeautifulSoup + Requests)

Persistência: JSON e LocalStorage

📈 Roadmap
[x] Deploy no GitHub Pages

[x] Multi-categorias e Destaques

[x] Filtros por Status e Modalidade

[x] Sistema de Temas (Dark/Light)

[ ] Favoritar cursos (localStorage)

[ ] Trilhas de estudo personalizadas

[ ] PWA (modo offline)

📦 Versionamento
Este projeto segue o padrão SemVer (Semantic Versioning):

MAJOR.MINOR.PATCH (Ex: 1.2.0 — adição de filtros de modalidade e status)

👤 Autor
Desenvolvido por Davi Robson 🎓 Estudante de Desenvolvimento de Sistemas

🎯 Foco em Infraestrutura, Cloud e Segurança

🔗 GitHub: https://github.com/Bit-Davirlc

📌 Observações
Dados baseados nos cursos gratuitos do portal SENAI SP

Classificação automatizada via análise de strings no Scraper

Projeto focado em demonstrar habilidades de Front-end e Integração de Dados

⭐ Se este projeto te ajudou, considere dar um star no repositório!
