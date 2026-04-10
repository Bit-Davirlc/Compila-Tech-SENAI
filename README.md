# 🎓 SENAI — Cursos Gratuitos de TI

> Projeto de portfólio desenvolvido como estudante de Desenvolvimento de Sistemas.
> Plataforma que centraliza cursos gratuitos do SENAI com foco em **Cloud, Segurança, Redes, Dados e Programação**.

---

## ✨ Funcionalidades

* 🔍 **Busca inteligente** por nome, área ou descrição
* 🏷️ **Multi-categorias por curso** (ex: Cloud + Dados + Segurança)
* 🎯 **Classificação automática** baseada em palavras-chave
* 🧭 **Filtros dinâmicos por área**
* 🖱️ **Scroll horizontal nas categorias (drag)**
* 🌙 **Tema Dark/Light** com persistência no `localStorage`
* 📱 **Totalmente responsivo** (mobile-first)
* ♿ **Acessível** — uso de HTML semântico e boas práticas de ARIA

---

## 🧠 Diferenciais do Projeto

* 🔄 **Atualização automatizada de cursos (scraping)**
* 🧩 Estrutura preparada para crescimento (dados desacoplados em JSON)
* 🏷️ Sistema de **multi-classificação** (um curso pode pertencer a várias áreas)
* 💡 UX aprimorada (drag, overflow controlado, badges dinâmicas)

---

## 🗂️ Estrutura do Projeto

```
senai-cursos-ti/
├── index.html          # Estrutura da página
├── README.md           # Documentação
├── css/
│   └── style.css       # Estilos, temas e responsividade
├── js/
│   └── app.js          # Lógica (render, busca, filtros, UX)
├── data/
│   └── cursos.json     # Base de cursos
└── scripts/
    └── scraper.py      # Coleta automática dos cursos (opcional)
```

---

## 🚀 Como Rodar

Por usar `fetch()` para carregar o JSON, é necessário um servidor local.

### 🔹 Opção 1 — VS Code (recomendado)

1. Instale a extensão **Live Server**
2. Clique com botão direito em `index.html`
3. Selecione **"Open with Live Server"**

---

### 🔹 Opção 2 — Terminal

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .
```

---

## 🔄 Atualização Automática (Scraping)

O projeto pode coletar cursos diretamente do site do SENAI.

### ▶️ Executar script:

```bash
python scripts/scraper.py
```

✔ Extrai cursos automaticamente
✔ Remove duplicados
✔ Atualiza o `cursos.json`

---

## ➕ Estrutura de um Curso

```json
{
  "id": "110384",
  "nome": "Administração de Sistemas ServiceNow - CSA",
  "areas": ["Cloud", "Infraestrutura"],
  "descricao": "Curso voltado à administração de sistemas ServiceNow.",
  "cargaHoraria": "40h",
  "status": "Disponível",
  "link": "https://www.sp.senai.br/curso/...",
  "destaque": false
}
```

---

## 🏷️ Categorias Suportadas

* ☁️ Cloud
* 🔐 Segurança
* 🌐 Redes
* 💻 Programação
* 📊 Dados
* 🏗️ Infraestrutura

> Um curso pode pertencer a **múltiplas categorias simultaneamente**.

---

## 🛠️ Tecnologias Utilizadas

* HTML5 semântico
* CSS3 (Custom Properties + Flexbox)
* JavaScript (Vanilla JS)
* JSON (persistência local)
* Python (Web Scraping com BeautifulSoup)

---

## 📈 Roadmap

* [x] Deploy no GitHub Pages
* [x] Multi-categorias
* [x] Classificação automática
* [ ] Favoritar cursos (localStorage)
* [ ] Trilhas de estudo personalizadas
* [ ] Filtro por carga horária
* [ ] Integração com APIs externas
* [ ] PWA (modo offline)

---

## 📦 Versionamento

Este projeto segue o padrão **SemVer (Semantic Versioning)**:

```
MAJOR.MINOR.PATCH
```

Exemplo:

* `1.0.0` → primeira versão estável
* `1.1.0` → novas funcionalidades
* `1.1.1` → correções

---

## 👤 Autor

Desenvolvido por **Davi Robson**
🎓 Estudante de Desenvolvimento de Sistemas
🎯 Foco em Infraestrutura, Cloud e Segurança

🔗 GitHub: https://github.com/Bit-Davirlc

---

## 📌 Observações

* Dados baseados nos cursos gratuitos do SENAI SP
* Atualização semi-automática via scraping
* Projeto com foco em portfólio e aprendizado prático

---

⭐ Se este projeto te ajudou, considere dar um star no repositório!
