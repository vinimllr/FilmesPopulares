import { conexaoApi } from "./conectaApi.js";
import { criaFilme } from "./criaFilme.js";

const botaoPesquisar = document.querySelector(".searchIcon");
const elementoPaiDaLista = document.querySelector(".movies");

async function pesquisaFilme(filme){
    console.log(filme)
    while(elementoPaiDaLista.firstChild){
        elementoPaiDaLista.removeChild(elementoPaiDaLista.firstChild);
    }
    const filmesPesquisados = await conexaoApi.pesquisaFilmes(filme);
    console.log(filmesPesquisados)
    filmesPesquisados.results.forEach(movie => elementoPaiDaLista.appendChild(criaFilme(movie)))

    if(filmesPesquisados.results.length == 0){
        elementoPaiDaLista.innerHTML = `<h2 class="titulo-principal">Busca não encontrada, não existem videos com esse termo</h2>`
    }
}







botaoPesquisar.addEventListener("click", (e) => {

    const filme = document.querySelector("#movie-name").value;
    console.log(filme)
    pesquisaFilme(filme);
})