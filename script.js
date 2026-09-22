const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const nomes = [
    "Gabriel",
    "Ana",
    "Lucas",
    "Sofia",
    "Rafael",
    "Beatriz",
    "Miguel",
    "Laura"
];

const perguntasOriginais = [
    {
        enunciado: "Assim que saiu da escola, você se depara com uma nova tecnologia: um chat que consegue responder a todas as dúvidas que uma pessoa pode ter e também gera imagens e áudios hiper-realistas. Qual é o seu primeiro pensamento?",
        alternativas: [
            {
                texto: "Isso é assustador!",
                afirmacoes: [
                    "Gabriel ficou preocupado com os possíveis riscos da Inteligência Artificial.",
                    "A primeira reação foi pensar que uma tecnologia tão poderosa precisa ser usada com responsabilidade."
                ]
            },
            {
                texto: "Isso é maravilhoso!",
                afirmacoes: [
                    "Gabriel ficou animado com as possibilidades que a Inteligência Artificial pode oferecer.",
                    "A novidade despertou curiosidade e vontade de aprender mais sobre a Inteligência Artificial."
                ]
            }
        ]
    },
    {
        enunciado: "Com a descoberta dessa tecnologia, chamada Inteligência Artificial (IA), uma professora de tecnologia decidiu fazer uma sequência de aulas sobre o assunto. No fim de uma aula, ela pede que você escreva um trabalho sobre o uso de IA em sala de aula. Qual atitude você toma?",
        alternativas: [
            {
                texto: "Utilizar uma ferramenta de busca que usa IA para encontrar informações relevantes e explicá-las em uma linguagem fácil de entender.",
                afirmacoes: [
                    "Gabriel decidiu usar a IA como ferramenta de pesquisa, conferindo as informações encontradas.",
                    "A tecnologia foi usada para ajudar no aprendizado, sem substituir a análise e a autoria de Gabriel."
                ]
            },
            {
                texto: "Escrever o trabalho com base nas conversas com colegas, em pesquisas na internet e nos conhecimentos próprios sobre o tema.",
                afirmacoes: [
                    "Gabriel preferiu construir o trabalho com pesquisas, conversas e conhecimentos próprios.",
                    "A pesquisa foi feita de maneira independente, comparando diferentes fontes de informação."
                ]
            }
        ]
    },
    {
        enunciado: "Após a elaboração do trabalho, a professora realizou um debate para entender como foi feita a pesquisa e a escrita. Também foi levantado um ponto importante: como a IA impacta o trabalho do futuro. Nesse debate, como você se posiciona?",
        alternativas: [
            {
                texto: "Defender a ideia de que a IA pode criar novas oportunidades de emprego e melhorar habilidades humanas.",
                afirmacoes: [
                    "Gabriel acredita que a IA pode abrir novas oportunidades e ajudar as pessoas a desenvolver habilidades.",
                    "Para Gabriel, o futuro do trabalho pode combinar a criatividade humana com os recursos da tecnologia."
                ]
            },
            {
                texto: "Preocupar-se com as pessoas que podem perder seus empregos para máquinas e defender a proteção dos trabalhadores.",
                afirmacoes: [
                    "Gabriel se preocupou com os trabalhadores e defendeu uma transição justa para o futuro.",
                    "O posicionamento foi de que a inovação precisa vir acompanhada de educação e proteção social."
                ]
            }
        ]
    },
    {
        enunciado: "Ao final da discussão, você precisa criar uma imagem no computador que represente o que pensa sobre IA. E agora?",
        alternativas: [
            {
                texto: "Criar uma imagem utilizando uma plataforma de design, como o Paint.",
                afirmacoes: [
                    "Gabriel escolheu criar a imagem manualmente, usando sua própria criatividade e suas habilidades de desenho.",
                    "A escolha valorizou o controle de cada detalhe e a criação feita diretamente por Gabriel."
                ]
            },
            {
                texto: "Criar uma imagem utilizando um gerador de imagens de IA.",
                afirmacoes: [
                    "Gabriel usou um gerador de imagens de IA, elaborando comandos e revisando o resultado final.",
                    "A Inteligência Artificial ajudou Gabriel a transformar uma ideia em uma imagem, sem substituir sua criatividade."
                ]
            }
        ]
    },
    {
        enunciado: "Você tem um trabalho em grupo de biologia para entregar na semana seguinte. O trabalho está atrasado e uma pessoa do grupo decidiu fazê-lo com ajuda da IA. O problema é que o texto ficou totalmente igual ao produzido pelo chat. O que você faz?",
        alternativas: [
            {
                texto: "Escrever comandos para o chat é uma forma de contribuir com o trabalho, por isso não há problema em utilizar o texto inteiro.",
                afirmacoes: [
                    "Gabriel aceitou o texto pronto, mas percebeu que seria importante verificar se as informações estavam corretas.",
                    "A escolha mostrou como é necessário conversar sobre autoria e responsabilidade no uso da IA."
                ]
            },
            {
                texto: "Revisar o trabalho e contribuir com as perspectivas pessoais, pois toda máquina pode cometer erros.",
                afirmacoes: [
                    "Gabriel defendeu a revisão do texto e a contribuição de todos os integrantes do grupo.",
                    "O trabalho foi aprimorado com análise crítica, conhecimento da equipe e responsabilidade no uso da IA."
                ]
            }
        ]
    }
];

let nomeJogador;
let perguntas;
let atual;
let historiaFinal;

function escolherNome() {
    const indice = Math.floor(Math.random() * nomes.length);
    return nomes[indice];
}

function personalizarTexto(texto) {
    return texto.replace(/\b(você|vocês)\b/gi, nomeJogador);
}

function iniciarJogo() {
    nomeJogador = escolherNome();
    perguntas = perguntasOriginais.map((pergunta) => ({
        ...pergunta,
        enunciado: personalizarTexto(pergunta.enunciado)
    }));
    atual = 0;
    historiaFinal = [];
    caixaPerguntas.style.display = "block";
    caixaAlternativas.style.display = "flex";
    caixaResultado.style.display = "none";
    mostrarPergunta();
}

function mostrarPergunta() {
    if (atual >= perguntas.length) {
        mostrarResultado();
        return;
    }

    const perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.innerHTML = "";

    perguntaAtual.alternativas.forEach((alternativa) => {
        const botaoAlternativa = document.createElement("button");
        botaoAlternativa.textContent = alternativa.texto;
        botaoAlternativa.addEventListener("click", () => selecionarResposta(alternativa));
        caixaAlternativas.appendChild(botaoAlternativa);
    });
}

function selecionarResposta(opcaoSelecionada) {
    const indice = Math.floor(Math.random() * opcaoSelecionada.afirmacoes.length);
    const afirmacaoPersonalizada = opcaoSelecionada.afirmacoes[indice]
        .replace(/\bGabriel\b/g, nomeJogador);
    historiaFinal.push(afirmacaoPersonalizada);
    atual++;
    mostrarPergunta();
}

function mostrarResultado() {
    caixaPerguntas.style.display = "none";
    caixaAlternativas.style.display = "none";
    caixaResultado.style.display = "block";
    textoResultado.innerHTML = `<strong>Em 2049, ${nomeJogador}...</strong><br><br>${historiaFinal.join(" ")}`;

    let botaoJogarNovamente = document.querySelector(".botao-jogar-novamente");

    if (!botaoJogarNovamente) {
        botaoJogarNovamente = document.createElement("button");
        botaoJogarNovamente.className = "botao-jogar-novamente";
        botaoJogarNovamente.textContent = "Jogar Novamente";
        botaoJogarNovamente.addEventListener("click", iniciarJogo);
        caixaResultado.appendChild(botaoJogarNovamente);
    }
}

iniciarJogo();
