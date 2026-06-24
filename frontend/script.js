const API_URL = "https://redesigned-space-tribble-975pjqg4qxj9cx5jp-8000.app.github.dev";

const resultadosBusca = document.getElementById("resultadosBusca");

async function carregarLivros() {
    try {
        const resposta = await fetch(`${API_URL}/livros`);
        const livros = await resposta.json();

        exibirLivros(livros);
    } catch (erro) {
        console.log("Erro ao carregar livros:", erro);
        resultadosBusca.innerHTML = "<p>Erro ao carregar livros.</p>";
    }
}

function exibirLivros(livros) {
    resultadosBusca.innerHTML = "";

    livros.forEach(livro => {
        const card = document.createElement("div");
        card.classList.add("livro");

        const img = document.createElement("img");
        img.src = livro.url_imagem;
        img.alt = livro.titulo;

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

        botao.addEventListener("click", async () => {
            if (livro.disponivel) {
                const livroAtualizado = {
                    titulo: livro.titulo,
                    autor: livro.autor,
                    url_imagem: livro.url_imagem,
                    disponivel: false
                };

                await fetch(`${API_URL}/livros/${livro.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(livroAtualizado)
                });

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

carregarLivros();