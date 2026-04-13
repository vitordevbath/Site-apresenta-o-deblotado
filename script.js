const mediaAssets = {
    carousel1: "assets/Arenas cósmicas e energia roxa.png",
    carousel2: "assets/ChatGPT Image 12 de abr. de 2026, 22_20_34.png",
    carousel3: "assets/Noite cósmica em pixel art.png",
    carousel4: "assets/O colapso da galáxia em 3279.png",
    gallery1: "assets/Arenas cósmicas e energia roxa.png",
    gallery2: "assets/ChatGPT Image 12 de abr. de 2026, 22_20_34.png",
    gallery3: "assets/Noite cósmica em pixel art.png",
    gallery4: "assets/O colapso da galáxia em 3279.png",
    gallery5: "assets/Arenas cósmicas e energia roxa.png",
    gallery6: "assets/Noite cósmica em pixel art.png"
};

const gameIframeSrc = "game/index.html";

function solicitarIdade() {
    const resposta = window.prompt("Qual e a sua idade?");

    if (resposta === null) {
        window.alert("Nao foi informada nenhuma idade.");
        return;
    }

    const idade = Number.parseInt(resposta, 10);

    if (Number.isNaN(idade) || idade < 0) {
        window.alert("Idade invalida. Digite um numero valido.");
        return;
    }

    if (idade < 18) {
        window.alert(`Voce tem ${idade} anos. Conteudo recomendado para maiores de 18.`);
        return;
    }

    window.alert(`Acesso liberado. Idade confirmada: ${idade} anos.`);
}

function abrirAba(evento, nomeAba) {
    const conteudoAba = document.getElementsByClassName("conteudo-aba");
    const botoesAba = document.getElementsByClassName("botao-aba");

    for (let i = 0; i < conteudoAba.length; i += 1) {
        conteudoAba[i].classList.remove("ativo");
    }

    for (let i = 0; i < botoesAba.length; i += 1) {
        botoesAba[i].classList.remove("ativo");
    }

    document.getElementById(nomeAba).classList.add("ativo");
    evento.currentTarget.classList.add("ativo");
}

let slideAtual = 0;
const slides = document.querySelectorAll(".carrossel-item");
const totalSlides = slides.length;

function carregarMidias() {
    document.querySelectorAll("[data-asset-key]").forEach((elemento) => {
        const chave = elemento.dataset.assetKey;
        const caminho = mediaAssets[chave];

        if (!caminho) {
            elemento.classList.add("sem-arquivo");
            elemento.dataset.missingLabel = `Defina o caminho de ${chave} no script.js`;
            return;
        }

        elemento.src = caminho;
        elemento.addEventListener("error", () => {
            elemento.removeAttribute("src");
            elemento.classList.add("sem-arquivo");
            elemento.dataset.missingLabel = `Arquivo nao encontrado: ${caminho}`;
        }, { once: true });
    });
}

function carregarJogo() {
    const frame = document.getElementById("game-frame");
    const fallback = document.getElementById("game-fallback");

    if (!gameIframeSrc) {
        return;
    }

    frame.src = gameIframeSrc;
    frame.addEventListener("load", () => {
        fallback.classList.add("oculto");
    });
}

function mostrarSlide(indice) {
    if (indice >= totalSlides) {
        slideAtual = 0;
    } else if (indice < 0) {
        slideAtual = totalSlides - 1;
    } else {
        slideAtual = indice;
    }

    const deslocamento = -slideAtual * 100;
    document.getElementById("carrossel-container").style.transform = `translateX(${deslocamento}%)`;
}

function mudarSlide(direcao) {
    mostrarSlide(slideAtual + direcao);
}

setInterval(() => {
    mudarSlide(1);
}, 5000);

document.getElementById("formulario-contato").addEventListener("submit", function (e) {
    e.preventDefault();

    const nomePiloto = document.getElementById("nome").value;
    const statusMensagem = document.getElementById("status-formulario");

    statusMensagem.innerHTML = `<p style="color: #00ff00; font-size: 0.7rem; margin-top: 10px;">&gt; TRANSMISSAO RECEBIDA, PILOTO ${nomePiloto.toUpperCase()}!</p>`;
    this.reset();
});

carregarMidias();
carregarJogo();
solicitarIdade();
