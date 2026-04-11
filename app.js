/* ============================================================
   SENAI Cursos TI — app.js (VERSÃO FINAL AJUSTADA)
   ============================================================ */

const estado = {
  cursos: [],
  filtroArea: "Todos",
  filtroStatus: "Todos",
  filtroModalidade: "Todos",
  termoBusca: "",
};

const elListaCursos = document.getElementById("lista-cursos");
const elCampoBusca = document.getElementById("campo-busca");
const elFiltrosArea = document.getElementById("filtro-area");
const elFiltrosStatus = document.getElementById("filtro-status");
const elFiltrosModalidade = document.getElementById("filtro-modalidade");
const elContador = document.getElementById("contador");
const elBtnTema = document.getElementById("btn-tema");
const elIconeTema = document.getElementById("icone-tema");

document.addEventListener("DOMContentLoaded", () => {
  carregarTema();
  carregarCursos();
  configurarEventos();
});

/* =========================
   CARREGAR CURSOS
========================= */
async function carregarCursos() {
  try {
    const resposta = await fetch("data/cursos.json");

    if (!resposta.ok) {
      throw new Error(`Erro ao carregar cursos: ${resposta.status}`);
    }

    const dados = await resposta.json();

    estado.cursos = dados.map((c) => ({
      ...c,
      status: c.status === "Disponível" ? "Disponível" : "Indisponível",
      modalidade: c.modalidade === "Presencial" ? "Presencial" : "EAD",
    }));

    criarBotoesFiltro();
    renderizarCursos();
  } catch (erro) {
    console.error("Falha ao carregar cursos:", erro);
  }
}

/* =========================
   FILTROS
========================= */

function criarGrupoFiltros(lista, tipo, valorAtual, callback) {
  const fragment = document.createDocumentFragment();

  lista.forEach((item) => {
    const btn = document.createElement("button");
    btn.className = "btn-filtro";
    btn.textContent = item;
    btn.dataset.tipo = tipo;
    btn.dataset.valor = item;

    if (item === valorAtual) btn.classList.add("ativo");

    btn.addEventListener("click", () => {
      callback(item);
      atualizarFiltros();
      renderizarCursos();
    });

    fragment.appendChild(btn);
  });

  return fragment;
}

function criarBotoesFiltro() {
  const todasAreas = estado.cursos.flatMap((c) =>
    Array.isArray(c.areas) ? c.areas : [c.area || "Outros"],
  );

  const areas = ["Todos", ...new Set(todasAreas)];
  const status = ["Todos", "Disponível", "Indisponível"];
  const modalidades = ["Todos", "Presencial", "EAD"];

  // 🔥 LIMPA CADA CONTAINER
  elFiltrosArea.innerHTML = "";
  elFiltrosStatus.innerHTML = "";
  elFiltrosModalidade.innerHTML = "";

  // 🔥 POPULA CADA FILTRO SEPARADAMENTE
  elFiltrosArea.appendChild(
    criarGrupoFiltros(areas, "area", estado.filtroArea, (val) => {
      estado.filtroArea = val;
    }),
  );

  elFiltrosStatus.appendChild(
    criarGrupoFiltros(status, "status", estado.filtroStatus, (val) => {
      estado.filtroStatus = val;
    }),
  );

  elFiltrosModalidade.appendChild(
    criarGrupoFiltros(
      modalidades,
      "modalidade",
      estado.filtroModalidade,
      (val) => {
        estado.filtroModalidade = val;
      },
    ),
  );
}

function atualizarFiltros() {
  document.querySelectorAll(".btn-filtro").forEach((btn) => {
    const tipo = btn.dataset.tipo;
    const valor = btn.dataset.valor;

    const ativo =
      (tipo === "area" && valor === estado.filtroArea) ||
      (tipo === "status" && valor === estado.filtroStatus) ||
      (tipo === "modalidade" && valor === estado.filtroModalidade);

    btn.classList.toggle("ativo", ativo);
  });
}

/* =========================
   FILTRAGEM
========================= */
function filtrarCursos() {
  return estado.cursos.filter((curso) => {
    const areas = Array.isArray(curso.areas)
      ? curso.areas
      : [curso.area || "Outros"];

    const passaArea =
      estado.filtroArea === "Todos" || areas.includes(estado.filtroArea);

    const passaStatus =
      estado.filtroStatus === "Todos" || curso.status === estado.filtroStatus;

    const passaModalidade =
      estado.filtroModalidade === "Todos" ||
      curso.modalidade === estado.filtroModalidade;

    const termo = estado.termoBusca.toLowerCase();

    const passaBusca =
      !termo ||
      curso.nome.toLowerCase().includes(termo) ||
      areas.some((a) => a.toLowerCase().includes(termo)) ||
      (curso.descricao || "").toLowerCase().includes(termo);

    return passaArea && passaStatus && passaModalidade && passaBusca;
  });
}

/* =========================
   RENDERIZAÇÃO
========================= */
function renderizarCursos() {
  const cursosVisiveis = filtrarCursos().sort((a, b) => {
    if (a.status === "Disponível" && b.status !== "Disponível") return -1;
    if (a.status !== "Disponível" && b.status === "Disponível") return 1;
    return 0;
  });

  atualizarContador(cursosVisiveis.length, estado.cursos.length);

  if (!cursosVisiveis.length) {
    elListaCursos.innerHTML = `<div class="vazio">Nenhum curso encontrado</div>`;
    return;
  }

  elListaCursos.innerHTML = cursosVisiveis.map(gerarCardHTML).join("");

  ativarDragScroll();
}

/* =========================
   CARD
========================= */
function gerarCardHTML(curso) {
  const classeStatus =
    curso.status === "Disponível" ? "disponivel" : "encerrado";

  const areas = Array.isArray(curso.areas)
    ? curso.areas
    : [curso.area || "Outros"];

  const badgesHTML = areas
    .map((a) => `<span class="badge-area">${a}</span>`)
    .join("");

  return `
    <article class="card">
      <div class="card-header">
        <div class="badges-areas">
          ${badgesHTML}
        </div>
        <span class="badge-status ${classeStatus}">
          ${curso.status}
        </span>
      </div>

      <h2 class="card-titulo">${curso.nome}</h2>

      <p class="card-descricao">${curso.descricao || ""}</p>

      <div class="card-footer">
        <div style="display:flex; gap:8px; align-items:center;">
          <span class="card-carga">⏱ ${curso.cargaHoraria || ""}</span>
        </div>
        <span class="badge-modalidade ${curso.modalidade.toLowerCase()}">
            ${curso.modalidade}
          </span>
        <a class="btn-curso" href="${curso.link}" target="_blank">
          Acessar →
        </a>
      </div>
    </article>
  `;
}

/* =========================
   CONTADOR
========================= */
function atualizarContador(visiveis, total) {
  elContador.textContent =
    visiveis === total ? `${total} cursos` : `${visiveis} de ${total} cursos`;
}

/* =========================
   EVENTOS
========================= */
function configurarEventos() {
  let timer;
  elCampoBusca.addEventListener("input", (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      estado.termoBusca = e.target.value.trim();
      renderizarCursos();
    }, 300);
  });

  elBtnTema?.addEventListener("click", alternarTema);
}

/* =========================
   TEMA
========================= */
function carregarTema() {
  const tema = localStorage.getItem("tema") || "light";
  aplicarTema(tema);
}

function alternarTema() {
  const atual = document.documentElement.dataset.theme;
  const novo = atual === "dark" ? "light" : "dark";
  aplicarTema(novo);
  localStorage.setItem("tema", novo);
}

function aplicarTema(tema) {
  document.documentElement.dataset.theme = tema;
  elIconeTema.textContent = tema === "dark" ? "☀️" : "🌙";
}

/* =========================
   DRAG SCROLL
========================= */
function ativarDragScroll() {
  document.querySelectorAll(".badges-areas").forEach((c) => {
    let down = false,
      startX,
      scroll;

    c.addEventListener("mousedown", (e) => {
      down = true;
      startX = e.pageX - c.offsetLeft;
      scroll = c.scrollLeft;
    });

    c.addEventListener("mouseup", () => (down = false));
    c.addEventListener("mouseleave", () => (down = false));

    c.addEventListener("mousemove", (e) => {
      if (!down) return;
      e.preventDefault();
      const x = e.pageX - c.offsetLeft;
      c.scrollLeft = scroll - (x - startX) * 1.5;
    });
  });
}
