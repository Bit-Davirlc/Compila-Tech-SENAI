import requests
from bs4 import BeautifulSoup
import re
import json
import os
import time

BASE_URL = "https://www.sp.senai.br/cursos/cursos-livres/tecnologia-da-informacao-e-informatica"
PARAMS = "?modalidade=1&regiao=1&gratuito=1&pag={}"
BASE_SITE = "https://www.sp.senai.br"

ARQUIVO_JSON = os.path.join("data", "cursos.json")
TEST_MODE = False # True para testar apenas a primeira página

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}

CATEGORIAS = {
    "Cloud": [
        "cloud", "nuvem", "aws", "azure", "gcp",
        "google cloud", "cloud computing", "iaas", "paas", "saas"
    ],

    "Segurança": [
        "segurança", "security", "ciber", "cyber",
        "hacking", "pentest", "ethical hacking",
        "soc", "siem", "forense", "criptografia",
        "firewall", "ids", "ips", "zero trust"
    ],

    "Redes": [
        "rede", "network", "tcp/ip", "ccna",
        "roteamento", "switching", "wireless",
        "dns", "dhcp", "vpn"
    ],

    "Programação": [
        "programação", "desenvolvimento", "dev",
        "python", "java", "javascript", "c#", "c++",
        "html", "css", "node", "react", "angular",
        "api", "backend", "frontend"
    ],

    "Dados": [
        "dados", "data", "sql", "analytics",
        "big data", "etl", "data warehouse",
        "data lake", "bi", "power bi", "looker",
        "dashboard"
    ],

    "IA": [
        "inteligência artificial", "ia",
        "machine learning", "deep learning",
        "llm", "generativa", "chatgpt",
        "ai", "modelo preditivo"
    ],

    "DevOps": [
        "devops", "ci/cd", "pipeline",
        "docker", "kubernetes", "container",
        "automação", "ansible", "terraform",
        "jenkins"
    ],

    "Infraestrutura": [
        "infraestrutura", "servidor",
        "linux", "windows server",
        "virtualização", "vmware",
        "hyper-v"
    ],

    "Banco de Dados": [
        "banco de dados", "database",
        "sql server", "mysql", "postgresql",
        "oracle", "mongodb", "nosql"
    ],

    "Certificação": [
        "certificação", "certificate",
        "certified", "exam", "badge"
    ]
}


# =========================
# 🔎 UTILIDADES
# =========================

def classificar_areas(nome, descricao):
    texto = f"{nome} {descricao}".lower()
    pontuacao = {}

    for categoria, palavras in CATEGORIAS.items():
        score = sum(1 for p in palavras if p in texto)

        if score > 0:
            pontuacao[categoria] = score

    if not pontuacao:
        return ["Outros"]

    # 🔥 pega o maior score
    max_score = max(pontuacao.values())

    # 🔥 mantém categorias relevantes (não só 1)
    areas = [
        categoria
        for categoria, score in pontuacao.items()
        if score >= max_score - 1  # tolerância
    ]

    return areas


def extrair_link_onclick(tag):
    onclick = tag.get("onclick", "")
    match = re.search(r"'(https://www\.sp\.senai\.br/curso/[^']+)'", onclick)

    if match:
        return match.group(1)

    return None


def normalizar_link(href):
    if not href:
        return None

    if href.startswith("/"):
        href = BASE_SITE + href

    href = href.split("?")[0]

    if "/curso/" not in href:
        return None

    return href


def extrair_id(href):
    match = re.search(r"/(\d+)", href or "")
    return int(match.group(1)) if match else None


# =========================
# 🔎 DETALHES DO CURSO
# =========================

def obter_detalhes(idcurso):
    url = f"{BASE_SITE}/cursosdescricao/{idcurso}"

    try:
        response = requests.get(url, headers=HEADERS, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")

        descricao = "Descrição não encontrada"
        carga = "Não informada"

        resumo = soup.find("h4", string=lambda x: x and "Resumo" in x)
        if resumo:
            texto = resumo.find_next("div", class_="col-12")
            if texto:
                descricao = texto.text.strip()

        carga_label = soup.find("strong", string=lambda x: x and "CARGA HORÁRIA" in x.upper())
        if carga_label:
            carga_valor = carga_label.find_next("div")
            if carga_valor:
                carga = carga_valor.text.strip()

        return descricao, carga

    except Exception as e:
        print(f"⚠️ Erro no curso {idcurso}: {e}")
        return "Descrição não disponível", "Não informada"


# =========================
# 📦 EXTRAÇÃO
# =========================

def extrair_cursos_pagina(pagina):
    url = BASE_URL + PARAMS.format(pagina)
    print(f"\n🔎 Página {pagina}")

    try:
        response = requests.get(url, headers=HEADERS, timeout=10)
        response.raise_for_status()
    except Exception as e:
        print(f"❌ Erro ao acessar página {pagina}: {e}")
        return []

    soup = BeautifulSoup(response.text, "html.parser")

    cards = soup.select(".card")
    print(f"📦 Cards encontrados: {len(cards)}")

    cursos = {}

    for card in cards:
        titulo = card.select_one(".card-title")
        if not titulo:
            continue

        nome = titulo.text.strip()

        # 🔹 Estratégia única e limpa para pegar link
        href = None

        # 1️⃣ tenta pegar pelo botão de compartilhar (onclick)
        share_btn = card.select_one("#btn-share")
        if share_btn:
            href = extrair_link_onclick(share_btn)

        # 2️⃣ fallback: tenta pegar <a> pai
        if not href:
            parent_a = titulo.find_parent("a")
            if parent_a:
                href = parent_a.get("href")

        # 🔹 normalização
        href = normalizar_link(href)

        if not href:
            print(f"⚠️ Sem link válido para: {nome}")
            continue

        idcurso = extrair_id(href)
        if not idcurso:
            print(f"⚠️ ID inválido: {href}")
            continue

        # 🔥 deduplicação automática via dict
        cursos[idcurso] = {
            "id": idcurso,
            "nome": nome,
            "link": href
        }

    print(f"✅ Cursos extraídos: {len(cursos)}")
    return list(cursos.values())


def extrair_todas_paginas():
    pagina = 1
    todos = []

    while True:
        cursos = extrair_cursos_pagina(pagina)

        if not cursos:
            print("🚫 Fim das páginas")
            break

        todos.extend(cursos)
        pagina += 1
        time.sleep(1)

    return todos


# =========================
# 💾 JSON
# =========================

def carregar_json():
    if not os.path.exists(ARQUIVO_JSON):
        return []

    with open(ARQUIVO_JSON, "r", encoding="utf-8") as f:
        return json.load(f)


def salvar_json(dados):
    os.makedirs("data", exist_ok=True)

    with open(ARQUIVO_JSON, "w", encoding="utf-8") as f:
        json.dump(dados, f, indent=2, ensure_ascii=False)


# =========================
# 🔄 ATUALIZAÇÃO
# =========================

def atualizar_cursos():
    existentes = carregar_json()

    novos = extrair_cursos_pagina(1) if TEST_MODE else extrair_todas_paginas()
    mapa = {c["id"]: c for c in existentes}

    adicionados = 0
    atualizados = 0

    for curso in novos:
        idcurso = curso["id"]

        print(f"🔄 Processando: {curso['nome']}")

        descricao, carga = obter_detalhes(idcurso)
        areas = classificar_areas(curso["nome"], descricao)

        dados = {
            "id": idcurso,
            "nome": curso["nome"],
            "areas": areas,
            "descricao": descricao,
            "cargaHoraria": carga,
            "status": "Disponível",
            "link": curso["link"],
            "destaque": any(area in ["Cloud", "Segurança"] for area in areas)
        }

        if idcurso in mapa:
            mapa[idcurso].update(dados)
            atualizados += 1
        else:
            existentes.append(dados)
            adicionados += 1

        time.sleep(0.5)

    salvar_json(existentes)

    print(f"\n🆕 Novos: {adicionados}")
    print(f"🔄 Atualizados: {atualizados}")
    print(f"📦 Total: {len(existentes)}")


# =========================
# 🚀 MAIN
# =========================

if __name__ == "__main__":
    atualizar_cursos()