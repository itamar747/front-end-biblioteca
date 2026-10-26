
import React, { useMemo, useState } from "react";
import "./App.css";

const livrosIniciais = [
  {
    id: 1,
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    categoria: "Literatura",
    capa: "https://covers.openlibrary.org/b/title/The%20Little%20Prince-M.jpg",
    disponivel: true,
  },
  {
    id: 2,
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    categoria: "Romance",
    capa: "https://covers.openlibrary.org/b/title/Dom%20Casmurro-M.jpg",
    disponivel: true,
  },
  {
    id: 3,
    titulo: "1984",
    autor: "George Orwell",
    categoria: "Ficção",
    capa: "https://covers.openlibrary.org/b/title/1984-M.jpg",
    disponivel: false,
  },
  {
    id: 4,
    titulo: "O Hobbit",
    autor: "J. R. R. Tolkien",
    categoria: "Fantasia",
    capa: "https://covers.openlibrary.org/b/title/The%20Hobbit-M.jpg",
    disponivel: true,
  },
];

export default function App() {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [favoritos, setFavoritos] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);
  const [somenteFavoritos, setSomenteFavoritos] =
    useState(false);

  const livros = useMemo(() => {
    return livrosIniciais.filter((livro) => {
      const termo = busca.toLowerCase();

      const correspondeBusca =
        livro.titulo.toLowerCase().includes(termo) ||
        livro.autor.toLowerCase().includes(termo);

      const correspondeCategoria =
        categoria === "Todos" ||
        livro.categoria === categoria;

      const correspondeFavoritos =
        !somenteFavoritos || favoritos.includes(livro.id);

      return (
        correspondeBusca &&
        correspondeCategoria &&
        correspondeFavoritos
      );
    });
  }, [busca, categoria, favoritos, somenteFavoritos]);

  function alternarFavorito(id) {
    setFavoritos((atuais) =>
      atuais.includes(id)
        ? atuais.filter((item) => item !== id)
        : [...atuais, id]
    );
  }

  function emprestar(livro) {
    if (!livro.disponivel || emprestimos.includes(livro.id)) {
      return;
    }

    setEmprestimos((atuais) => [...atuais, livro.id]);
  }

  return (
    <div className="app">
      <header className="topo">
        <a className="logo" href="#">
          <span>✦</span> Biblioteca Aurora
        </a>
        <nav>
          <a href="#catalogo">Catálogo</a>
          <a href="#sobre">Sobre</a>
          <button onClick={() => setSomenteFavoritos(!somenteFavoritos)}>
            ♥ Favoritos ({favoritos.length})
          </button>
        </nav>
      </header>

      <main>
        <section className="hero">
          <span className="etiqueta">SEU PRÓXIMO CAPÍTULO</span>
          <h1>Uma nova história<br />começa aqui.</h1>
          <p>
            Explore nosso acervo e encontre o livro
            perfeito para você.
          </p>
          <a className="botao" href="#catalogo">
            Explorar catálogo →
          </a>
        </section>

        <section id="catalogo" className="catalogo">
          <div className="cabecalho">
            <div>
              <span className="etiqueta">NOSSO ACERVO</span>
              <h2>Descubra sua próxima leitura</h2>
            </div>
            <span>{livros.length} livros encontrados</span>
          </div>

          <input
            className="busca"
            placeholder="Buscar por título ou autor..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <div className="categorias">
            {["Todos", "Literatura", "Romance", "Ficção", "Fantasia"].map(
              (item) => (
                <button
                  key={item}
                  className={categoria === item ? "ativa" : ""}
                  onClick={() => setCategoria(item)}
                >
                  {item}
                </button>
              )
            )}
          </div>

          <div className="grade">
            {livros.map((livro) => (
              <article className="livro" key={livro.id}>
                <div className="capa">
                  <img
                    src={livro.capa}
                    alt={`Capa de ${livro.titulo}`}
                  />
                  <button
                    className="favorito"
                    onClick={() => alternarFavorito(livro.id)}
                    aria-label="Adicionar aos favoritos"
                  >
                    {favoritos.includes(livro.id) ? "♥" : "♡"}
                  </button>
                </div>
                <span className="categoria">{livro.categoria}</span>
                <h3>{livro.titulo}</h3>
                <p>{livro.autor}</p>
                <span className={livro.disponivel ? "status" : "status indisponivel"}>
                  {livro.disponivel ? "Disponível" : "Indisponível"}
                </span>
                <button
                  className="emprestar"
                  disabled={!livro.disponivel || emprestimos.includes(livro.id)}
                  onClick={() => emprestar(livro)}
                >
                  {emprestimos.includes(livro.id)
                    ? "Solicitação registrada"
                    : livro.disponivel
                      ? "Solicitar empréstimo"
                      : "Indisponível"}
                </button>
              </article>
            ))}
          </div>

          {livros.length === 0 && (
            <p>Nenhum livro encontrado. Tente outra pesquisa.</p>
          )}

          <section className="meus-emprestimos">
            <h2>Meus empréstimos</h2>
            <p>{emprestimos.length} solicitação(ões) nesta sessão.</p>
          </section>
        </section>

        <section id="sobre" className="sobre">
          <h2>Conhecimento que transforma.</h2>
          <p>
            Um espaço para descobrir histórias, aprender
            e compartilhar conhecimento.
          </p>
        </section>
      </main>

      <footer>Biblioteca Aurora © 2026 · Todos os direitos reservados</footer>
    </div>
  );
}
