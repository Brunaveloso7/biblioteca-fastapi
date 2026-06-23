const API_URL = "https://redesigned-space-tribble-975pjqg4qxj9cx5jp-8000.app.github.dev";

const resultadosBusca = document.getElementById("resultadosBusca");

async function carregarLivros() {
    try {
        const resposta = await fetch(`${API_URL}/livros`);
        const livros = await resposta.json();

        exibirLivros(livros);
    } catch (erro) {
        console.log("Erro ao buscar livros:", erro);
        resultadosBusca.innerHTML = "<p>Erro ao carregar livros da API.</p>";
    }
}

function exibirLivros(livros) {
    resultadosBusca.innerHTML = "";

    livros.forEach(livro => {
        const card = document.createElement("div");
        card.classList.add("livro");

        card.innerHTML = `
            <img src="${livro.url_imagem}" alt="${livro.titulo}">
            <h3>${livro.titulo}</h3>
            <p>Autor: ${livro.autor}</p>
            <div class="status">
                ${livro.disponivel ? "Disponível" : "Indisponível"}
            </div>
        `;

        resultadosBusca.appendChild(card);
    });
}

carregarLivros();