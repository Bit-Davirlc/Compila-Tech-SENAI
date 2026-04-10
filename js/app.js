/* ============================================================
   SENAI Cursos TI — app.js

   ESTRUTURA DESTE ARQUIVO:
   1. Estado da aplicação (o que está acontecendo agora)
   2. Inicialização (o que roda quando a página carrega)
   3. Carregamento dos dados (fetch do JSON)
   4. Renderização (transforma dados em HTML)
   5. Filtros e busca (lógica de filtragem)
   6. Tema dark/light (alternância)
   7. Funções auxiliares

   POR QUÊ SEPARAR ASSIM?
   É o início do pensamento em "separação de responsabilidades".
   Cada função faz UMA coisa. Isso facilita manutenção e evolução.
   ============================================================ */

/* ----------------------------------------------------------
   1. ESTADO DA APLICAÇÃO

   POR QUÊ UM OBJETO DE ESTADO?
   Em vez de variáveis espalhadas, centralizamos tudo aqui.
   É o princípio básico por trás de frameworks como React/Vue.
   ---------------------------------------------------------- */
const estado = {
  cursos: [], // Lista completa de cursos (carregada do JSON)
  filtroArea: "Todos", // Área selecionada no filtro
  termoBusca: "", // Texto digitado no campo de busca
};

/* ----------------------------------------------------------
   2. REFERÊNCIAS AOS ELEMENTOS DO DOM

   POR QUÊ GUARDAR EM VARIÁVEIS?
   document.getElementById() percorre o HTML toda vez que é
   chamado. Guardando a referência, acessamos diretamente.
   ---------------------------------------------------------- */
const elListaCursos = document.getElementById("lista-cursos");
const elCampoBusca = document.getElementById("campo-busca");
const elFiltros = document.getElementById("filtros");
const elContador = document.getElementById("contador");
const elBtnTema = document.getElementById("btn-tema");
const elIconeTema = document.getElementById("icone-tema");

/* ----------------------------------------------------------
   3. INICIALIZAÇÃO
   Ponto de entrada: roda quando o DOM está pronto
   ---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  carregarTema(); // Aplica tema salvo (dark/light)
  carregarCursos(); // Busca os dados do JSON
  configurarEventos(); // Liga os eventos de interação
});

/* ----------------------------------------------------------
   4. CARREGAMENTO DOS DADOS

   POR QUÊ fetch() E NÃO JSON HARDCODED NO JS?
   - O JSON fica num arquivo separado, fácil de atualizar
   - Simula como funciona uma API real (requisição HTTP)
   - fetch() retorna uma "Promise" — conceito fundamental em JS

   CONCEITO: async/await
   É uma forma moderna de lidar com operações assíncronas
   (que demoram, como carregar um arquivo ou chamar uma API).
   "await" pausa a função até a resposta chegar.
   ---------------------------------------------------------- */
async function carregarCursos() {
  try {
    // Tenta buscar o arquivo JSON
    const resposta = await fetch("data/cursos.json");

    // Se o servidor respondeu com erro (ex: arquivo não encontrado)
    if (!resposta.ok) {
      throw new Error(`Erro ao carregar cursos: ${resposta.status}`);
    }

    // Converte a resposta para array JavaScript
    estado.cursos = await resposta.json();

    // Com os dados prontos, cria os filtros e renderiza os cards
    criarBotoesFiltro();
    renderizarCursos();
  } catch (erro) {
    // Se algo der errado, exibe mensagem amigável
    console.error("Falha ao carregar cursos:", erro);
    elListaCursos.innerHTML = `
      <div class="vazio">
        <div class="icone-vazio">⚠️</div>
        <p>Não foi possível carregar os cursos.<br>
           Verifique se está rodando em um servidor local.</p>
      </div>
    `;
  }
}

/* ----------------------------------------------------------
   5. CRIAÇÃO DOS BOTÕES DE FILTRO

   POR QUÊ GERAR DINAMICAMENTE?
   Se amanhã você adicionar "DevOps" no JSON, o botão aparece
   automaticamente — sem mexer no HTML ou no JS.
   ---------------------------------------------------------- */
function criarBotoesFiltro() {
  // Set() elimina duplicatas automaticamente
  const areas = ["Todos", ...new Set(estado.cursos.flatMap((c) => c.areas))];

  elFiltros.innerHTML = "<span>Filtrar por:</span>";

  areas.forEach((area) => {
    const btn = document.createElement("button");
    btn.className = "btn-filtro" + (area === estado.filtroArea ? " ativo" : "");
    btn.textContent = area;
    btn.dataset.area = area;

    btn.addEventListener("click", () => {
      estado.filtroArea = area;
      atualizarBotoesFiltro();
      renderizarCursos();
    });

    elFiltros.appendChild(btn);
  });
}

function atualizarBotoesFiltro() {
  document.querySelectorAll(".btn-filtro").forEach((btn) => {
    btn.classList.toggle("ativo", btn.dataset.area === estado.filtroArea);
  });
}

/* ----------------------------------------------------------
   6. FILTRAR CURSOS

   POR QUÊ filter() E includes()?
   - Array.filter() retorna um novo array com itens que passam
     no teste. Não modifica o array original — boa prática!
   - String.includes() verifica se um texto contém outro.
   - toLowerCase() garante que "redes" encontra "Redes" ou "REDES"
   ---------------------------------------------------------- */
function filtrarCursos() {
  return estado.cursos.filter((curso) => {
    // Verifica filtro de área
    const passaArea =
      estado.filtroArea === "Todos" ||
      (curso.areas && curso.areas.includes(estado.filtroArea));

    // Verifica busca por texto (nome ou descrição)
    const termo = estado.termoBusca.toLowerCase();
    const passaBusca =
      !termo ||
      curso.nome.toLowerCase().includes(termo) ||
      curso.areas.some((area) => area.toLowerCase().includes(termo)) ||
      curso.descricao.toLowerCase().includes(termo);

    // O curso só aparece se passar nos DOIS filtros
    return passaArea && passaBusca;
  });
}

/* ----------------------------------------------------------
   7. RENDERIZAÇÃO DOS CARDS

   POR QUÊ innerHTML COM TEMPLATE LITERAL?
   É a forma mais direta de criar HTML dinamicamente sem
   frameworks. Template literals (crase + ${}) permitem
   HTML legível com variáveis embutidas.

   Em projetos maiores, usaríamos componentes (React/Vue),
   mas para começar, isso é perfeito e bem legível.
   ---------------------------------------------------------- */
function renderizarCursos() {
  const cursosVisiveis = filtrarCursos();

  // Atualiza o contador
  atualizarContador(cursosVisiveis.length, estado.cursos.length);

  // Nenhum resultado encontrado
  if (cursosVisiveis.length === 0) {
    elListaCursos.innerHTML = `
      <div class="vazio">
        <div class="icone-vazio">🔍</div>
        <p>Nenhum curso encontrado para "<strong>${estado.termoBusca}</strong>".<br>
           Tente outro termo ou remova os filtros.</p>
      </div>
    `;
    return;
  }

  // Gera o HTML de cada card e junta tudo de uma vez
  // (mais eficiente do que criar elemento por elemento)
  elListaCursos.innerHTML = cursosVisiveis.map(gerarCardHTML).join("");
  ativarDragScroll();
}

/* ----------------------------------------------------------
   8. TEMPLATE DO CARD

   POR QUÊ FUNÇÃO SEPARADA?
   - Facilita ler e manter
   - Se o visual do card mudar, mexe só aqui
   - Cada função faz UMA coisa (Single Responsibility)
   ---------------------------------------------------------- */
function gerarCardHTML(curso) {
  // Define CSS class para cursos encerrados
  const classeEncerrado = curso.status === "Encerrado" ? " encerrado" : "";

  // Define CSS class para o badge de status
  const classeStatus =
    curso.status === "Disponível" ? "disponivel" : "encerrado";

  // Desabilita o botão de cursos encerrados
  const atributoLink =
    curso.status === "Encerrado"
      ? 'aria-disabled="true" style="opacity:0.5;pointer-events:none"'
      : `href="${curso.link}" target="_blank" rel="noopener noreferrer"`;

  return `
    <article class="card${classeEncerrado}">
      <div class="card-header">
        <div class="badges-areas">
          ${(curso.areas || [curso.area])
            .map((area) => `<span class="badge-area">${area}</span>`)
            .join("")}
        </div>

        <span class="badge-status ${classeStatus}">${curso.status}</span>
      </div>

      <h2 class="card-titulo">${curso.nome}</h2>

      <p class="card-descricao">${curso.descricao}</p>

      <div class="card-footer">
        <span class="card-carga">⏱ ${curso.cargaHoraria}</span>
        <a class="btn-curso" ${atributoLink}>
          ${curso.status === "Disponível" ? "Acessar curso →" : "Encerrado"}
        </a>
      </div>
    </article>
  `;
}

/* ----------------------------------------------------------
   9. CONTADOR DE RESULTADOS
   ---------------------------------------------------------- */
function atualizarContador(visiveis, total) {
  if (!elContador) return;
  if (visiveis === total) {
    elContador.textContent = `${total} curso${total !== 1 ? "s" : ""} disponível${total !== 1 ? "is" : ""}`;
  } else {
    elContador.textContent = `${visiveis} de ${total} cursos`;
  }
}

/* ----------------------------------------------------------
   10. EVENTOS DE INTERAÇÃO

   POR QUÊ addEventListener E NÃO onclick NO HTML?
   - Separação entre HTML (estrutura) e JS (comportamento)
   - Podemos adicionar vários listeners no mesmo elemento
   - Mais fácil de remover/atualizar depois

   CONCEITO: debounce
   Sem debounce, a busca rodaria a cada tecla digitada.
   Com debounce, espera 300ms após parar de digitar.
   Economiza processamento em listas grandes.
   ---------------------------------------------------------- */
function configurarEventos() {
  // Busca com debounce
  let timerBusca;
  elCampoBusca.addEventListener("input", (e) => {
    clearTimeout(timerBusca);
    timerBusca = setTimeout(() => {
      estado.termoBusca = e.target.value.trim();
      renderizarCursos();
    }, 300);
  });

  // Botão de alternar tema
  if (elBtnTema) {
    elBtnTema.addEventListener("click", alternarTema);
  }
}

/* ----------------------------------------------------------
   11. TEMA DARK / LIGHT

   POR QUÊ localStorage?
   Salva a preferência do usuário no navegador.
   Mesmo fechando e reabrindo, o tema escolhido permanece.
   ---------------------------------------------------------- */
function carregarTema() {
  // Verifica preferência salva, ou usa preferência do sistema
  const temaSalvo = localStorage.getItem("tema");
  const prefereEscuro = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const tema = temaSalvo || (prefereEscuro ? "dark" : "light");
  aplicarTema(tema);
}

function alternarTema() {
  const temaAtual = document.documentElement.dataset.theme || "light";
  const novoTema = temaAtual === "dark" ? "light" : "dark";
  aplicarTema(novoTema);
  localStorage.setItem("tema", novoTema);
}

function aplicarTema(tema) {
  document.documentElement.dataset.theme = tema;
  if (elIconeTema) {
    elIconeTema.textContent = tema === "dark" ? "☀️" : "🌙";
  }
}

function ativarDragScroll() {
  const containers = document.querySelectorAll(".badges-areas");

  containers.forEach((container) => {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener("mousedown", (e) => {
      isDown = true;
      container.classList.add("dragging");

      // 🔥 bloqueia seleção global temporariamente
      document.body.style.userSelect = "none";

      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener("mouseup", () => {
      isDown = false;
      container.classList.remove("dragging");

      // 🔥 reativa seleção
      document.body.style.userSelect = "";
    });

    container.addEventListener("mouseleave", () => {
      isDown = false;
      container.classList.remove("dragging");

      document.body.style.userSelect = "";
    });

    container.addEventListener("mouseup", () => {
      isDown = false;
      container.classList.remove("dragging");
    });

    container.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();

      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5; // velocidade do scroll
      container.scrollLeft = scrollLeft - walk;
    });
  });
}
