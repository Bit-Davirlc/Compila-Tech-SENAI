# 🎓 SENAI — Cursos Gratuitos de TI

> Projeto de portfólio desenvolvido como estudante de Desenvolvimento de Sistemas.  
> Lista de cursos gratuitos do SENAI nas áreas de Redes, Cloud, Segurança e Programação.

## ✨ Funcionalidades

- 🔍 **Busca** por nome, área ou descrição
- 🏷️ **Filtros** por área (Redes, Cloud, Segurança, Programação)
- 🌙 **Tema Dark/Light** com persistência no localStorage
- 📱 **Responsivo** — funciona em celular, tablet e desktop
- ♿ **Acessível** — uso correto de ARIA e elementos semânticos

## 🗂️ Estrutura do Projeto

```
senai-cursos-ti/
├── index.html          # Estrutura da página
├── README.md           # Este arquivo
├── css/
│   └── style.css       # Estilos e variáveis de tema
├── js/
│   └── app.js          # Lógica: carregamento, busca e filtros
└── data/
    └── cursos.json     # Dados dos cursos (adicione novos aqui!)
```

## 🚀 Como Rodar

Por usar `fetch()` para carregar o JSON, o projeto precisa de um servidor local.

### Opção 1 — VS Code (recomendado)
1. Instale a extensão **Live Server**
2. Clique com botão direito em `index.html`
3. Selecione **"Open with Live Server"**

### Opção 2 — Terminal
```bash
# Python 3
python -m http.server 8000

# Node.js (se tiver instalado)
npx serve .
```

## ➕ Adicionar um Novo Curso

Abra `data/cursos.json` e adicione um objeto seguindo o padrão:

```json
{
  "id": 9,
  "nome": "Nome do Curso",
  "area": "Redes",
  "descricao": "Breve descrição do que o curso ensina.",
  "cargaHoraria": "20h",
  "status": "Disponível",
  "link": "https://link-do-curso.com.br",
  "destaque": false
}
```

**Áreas disponíveis:** `Redes` · `Cloud` · `Segurança` · `Programação`  
**Status disponíveis:** `Disponível` · `Encerrado`

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 com variáveis (custom properties)
- JavaScript puro (Vanilla JS)
- JSON como fonte de dados

## 📈 Próximas Melhorias (roadmap)

- [ ] Deploy no GitHub Pages
- [ ] Marcar cursos como favoritos (localStorage)
- [ ] Trilhas de estudo (ordenação por sequência)
- [ ] Filtro por carga horária
- [ ] Modo PWA (funcionar offline)

## 👤 Autor

Desenvolvido por **[Seu Nome]**  
[LinkedIn](https://linkedin.com) · [GitHub](https://github.com)

---

*Dados baseados nos cursos gratuitos do [SENAI SP](https://www.sp.senai.br) — atualizado em 2025.*
