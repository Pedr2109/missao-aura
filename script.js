
const perfis = {
    engenheiro: {
        codigo: "AURA-ENG / 01",
        nome: "ENGENHEIRO",
        imagem: "perfil-1.jpg",
        descricao: "Você transforma problemas em soluções. Sua capacidade de raciocínio técnico e sua criatividade ajudam a manter a missão funcionando mesmo diante de falhas inesperadas.",
        funcao: "Construção, manutenção e tecnologia.",
        dica: "Use sua criatividade para encontrar soluções sem ignorar os riscos."
    },
    cientista: {
        codigo: "AURA-CIE / 02",
        nome: "CIENTISTA",
        imagem: "perfil-2.jpg",
        descricao: "Sua curiosidade é sua maior ferramenta. Você busca evidências, investiga fenômenos e transforma descobertas em conhecimento que pode mudar o futuro da humanidade.",
        funcao: "Pesquisa, experimentação e análise.",
        dica: "Questione suas hipóteses e deixe as evidências guiarem suas descobertas."
    },
    explorador: {
        codigo: "AURA-EXP / 03",
        nome: "EXPLORADOR",
        imagem: "perfil-3.jpg",
        descricao: "O desconhecido não é um limite para você. Sua iniciativa e disposição para descobrir novos caminhos ajudam a equipe a conhecer o planeta e encontrar oportunidades.",
        funcao: "Reconhecimento, navegação e exploração.",
        dica: "Explore com coragem, mas mantenha a segurança da equipe como prioridade."
    },
    estrategista: {
        codigo: "AURA-EST / 04",
        nome: "ESTRATEGISTA",
        imagem: "perfil-4.jpg",
        descricao: "Você enxerga o cenário completo. Sua habilidade de avaliar alternativas, organizar recursos e pensar adiante ajuda a equipe a tomar decisões importantes.",
        funcao: "Planejamento, coordenação e decisões.",
        dica: "Considere diferentes perspectivas e adapte o plano quando necessário."
    }
};

const formulario = document.getElementById("aura-form");
const campoNome = document.getElementById("nome");
const campoNascimento = document.getElementById("nascimento");
const secaoFormulario = document.getElementById("formulario");
const secaoResultado = document.getElementById("resultado");
const botaoRefazer = document.getElementById("refazer");

// Impede a seleção de datas futuras.
const hoje = new Date();
const dataLocal = [
    hoje.getFullYear(),
    String(hoje.getMonth() + 1).padStart(2, "0"),
    String(hoje.getDate()).padStart(2, "0")
].join("-");

campoNascimento.max = dataLocal;

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = campoNome.value.trim();
    const nascimento = campoNascimento.value;

    if (!nome) {
        alert("Digite seu nome para continuar.");
        campoNome.focus();
        return;
    }

    if (!nascimento || nascimento > dataLocal) {
        alert("Informe uma data de nascimento válida.");
        campoNascimento.focus();
        return;
    }

    const dataInformada = new Date(nascimento + "T00:00:00");

    if (
        Number.isNaN(dataInformada.getTime()) ||
        dataInformada.toISOString().slice(0, 10) !== nascimento
    ) {
        alert("Confira a data de nascimento informada.");
        campoNascimento.focus();
        return;
    }

    const pontuacao = {
        engenheiro: 0,
        cientista: 0,
        explorador: 0,
        estrategista: 0
    };

    for (let numero = 1; numero <= 4; numero++) {
        const resposta = formulario.querySelector(
            `input[name="q${numero}"]:checked`
        );

        if (!resposta) {
            alert("Responda a todas as perguntas.");
            return;
        }

        pontuacao[resposta.value]++;
    }

    const maiorPontuacao = Math.max(...Object.values(pontuacao));

    const empatados = Object.keys(pontuacao).filter(
        perfil => pontuacao[perfil] === maiorPontuacao
    );

    // Em caso de empate, escolhe aleatoriamente entre os perfis empatados.
    const perfilEscolhido =
        empatados[Math.floor(Math.random() * empatados.length)];

    const perfil = perfis[perfilEscolhido];

    document.getElementById("saudacao").textContent =
        `Tripulante ${nome}, sua análise foi concluída. Seu perfil predominante foi identificado.`;

    document.getElementById("codigo-perfil").textContent = perfil.codigo;
    document.getElementById("nome-perfil").textContent = perfil.nome;
    document.getElementById("descricao-perfil").textContent = perfil.descricao;
    document.getElementById("funcao-perfil").textContent = perfil.funcao;
    document.getElementById("dica-perfil").textContent = perfil.dica;

    const imagem = document.getElementById("imagem-perfil");
    imagem.src = perfil.imagem;
    imagem.alt = `Ilustração do perfil ${perfil.nome.toLowerCase()}`;

    imagem.onerror = function () {
        imagem.alt = "Imagem não encontrada. Confira o nome do arquivo.";
        imagem.style.display = "none";
    };

    imagem.onload = function () {
        imagem.style.display = "block";
    };

    secaoFormulario.hidden = true;
    secaoResultado.hidden = false;

    secaoResultado.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

botaoRefazer.addEventListener("click", function () {
    formulario.reset();
    secaoResultado.hidden = true;
    secaoFormulario.hidden = false;

    const imagem = document.getElementById("imagem-perfil");
    imagem.style.display = "block";
    imagem.removeAttribute("src");

    secaoFormulario.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});
