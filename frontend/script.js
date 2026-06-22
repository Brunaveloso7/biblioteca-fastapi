const livros = [
    {
        titulo: "Naruto Gold Vol. 25",
        autor: "Masashi Kishimoto",
        url_imagem: "https://m.media-amazon.com/images/I/71QYLrc-IQL.jpg",
        disponivel: true
    },
    {
        titulo: "Beyond The Story",
        autor: "Myeongseok Kang",
        url_imagem: "https://m.media-amazon.com/images/I/81fozPElIyL._UF1000,1000_QL80_.jpg",
        disponivel: false
    },
    {
        titulo: "Diário de Um Banana",
        autor: "Jeff Kinney",
        url_imagem: "https://m.media-amazon.com/images/I/71fWaI5myqL.jpg",
        disponivel: true
    }
];

const resultadosBusca = document.getElementById("resultadosBusca");

resultadosBusca.innerHTML = "";

livros.forEach(livro => {
    const card = document.createElement("div");
    card.classList.add("livro");

    card.innerHTML = `
        <img src="${livro.url_imagem}" alt="${livro.titulo}">
        <h3>${livro.titulo}</h3>
        <p>Autor: ${livro.autor}</p>
        <div class="status">${livro.disponivel ? "Disponível" : "Indisponível"}</div>
    `;

    resultadosBusca.appendChild(card);
});