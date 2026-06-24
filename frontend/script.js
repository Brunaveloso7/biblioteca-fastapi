const livrosEncontrados = [
    {
        id: 1,
        titulo: "Naruto Gold Vol. 25",
        autor: "Masashi Kishimoto",
        imagem: "https://m.media-amazon.com/images/I/91yHC4nDaHL._SY466_.jpg",
        disponivel: true
    },
    {
        id: 2,
        titulo: "Beyond The Story",
        autor: "Myeongseok Kang",
        imagem: "https://m.media-amazon.com/images/I/81fozPElIyL._UF1000,1000_QL80_.jpg",
        disponivel: false
    },
    {
        id: 3,
        titulo: "O Horizonte Mora Em Um Dia Cinza",
        autor: "Tatielle Katluryn",
        imagem: "https://imgv2-1-f.scribdassets.com/img/word_document/720044759/original/8019ac30d4/1?v=1",
        disponivel: true
    },
    {
        id: 4,
        titulo: "Diário de Um Banana",
        autor: "Jeff Kinney",
        imagem: "https://m.media-amazon.com/images/I/71fWaI5myqL.jpg",
        disponivel: true
    }
];

const resultadosBusca = document.getElementById("resultadosBusca");

function exibirLivros(livros) {
    resultadosBusca.innerHTML = "";

    livros.forEach(livro => {
        const card = document.createElement("div");
        card.classList.add("livro");

        const img = document.createElement("img");
        img.src = livro.imagem;

        const titulo = document.createElement("h3");
        titulo.textContent = livro.titulo;

        const autor = document.createElement("p");
        autor.textContent = "Autor: " + livro.autor;

        const status = document.createElement("div");
        status.classList.add("status");

        const botao = document.createElement("button");
        botao.classList.add("botao");

        if (livro.disponivel) {
            status.textContent = "Disponível";
            botao.textContent = "Reservar";
        } else {
            status.textContent = "Indisponível";
            botao.textContent = "Receber aviso";
        }

        botao.addEventListener("click", () => {
            if (livro.disponivel) {
                livro.disponivel = false;
                status.textContent = "Indisponível";
                botao.textContent = "Reservado!";
                botao.disabled = true;
            } else {
                botao.textContent = "Aviso ativado!";
                botao.disabled = true;
            }
        });

        card.appendChild(img);
        card.appendChild(titulo);
        card.appendChild(autor);
        card.appendChild(botao);
        card.appendChild(status);

        resultadosBusca.appendChild(card);
    });
}

exibirLivros(livrosEncontrados);