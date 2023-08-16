import { conexaoApi } from "./conectaApi.js";


const elementoPaiDaLista = document.querySelector(".movies");
let numero = 0;
const lista = await conexaoApi.getFilmes();
const listaDeFilmes = JSON.parse(localStorage.getItem('listaDeFilmes')) || [];;
export function criaFilme(movie){
    const release_date = movie.release_date.substr(0,4)
    const bannerFilme = document.createElement("li");
    bannerFilme.className = "movie";
    bannerFilme.innerHTML = `<div class="movie-informations">
        <div class="movie-image">
            <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt="${movie.title}"/>
        </div>
        <div class="movie-text">
            <h4>${movie.title} (${release_date})</h4>
            <div class="rating-favorites">
                <div class="rating">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 0L13.09 6.26L20 7.27L15 12.14L16.18 19.02L10 15.77L3.82 19.02L5 12.14L0 7.27L6.91 6.26L10 0Z" fill="#D7A82F"/>
                    </svg>
                    <span>${movie.vote_average.toFixed(1)}</span>
                </div>
                <div class="favoritar">
                    <input name="favoritar" type="checkbox" id='favoritar-checkbox${numero}' class="input-favoritar">
                    <label for="favoritar-checkbox${numero}" class="custom-checkbox-label">
                        <span class="custom-checkbox-icon"></span>
                        Favoritar
                    </label>
                </div>
            </div>
        </div>
    </div>
    <div class="movie-description">
        <span>${movie.overview}</span>
    </div>`


    const botaoFavoritar = bannerFilme.querySelector(`#favoritar-checkbox${numero}`);
    numero++;


    botaoFavoritar.addEventListener("change", function(){
        const filmeExistente = listaDeFilmes.find(item => item.id === movie.id);
        
        if (this.checked) {
            if (!filmeExistente) {
                const filme = {
                    "id": movie.id,
                    "poster_path": movie.poster_path,
                    "title": movie.title,
                    "release_date": movie.release_date,
                    "vote_average": movie.vote_average,
                    "isFavorited": true
                };
                listaDeFilmes.push(filme);
                localStorage.setItem("listaDeFilmes", JSON.stringify(listaDeFilmes));
            }
        } else {
            const filmeIndex = listaDeFilmes.findIndex(item => item.id === movie.id);
            if (filmeIndex !== -1) {
                listaDeFilmes.splice(filmeIndex, 1);
                localStorage.setItem("listaDeFilmes", JSON.stringify(listaDeFilmes));
            }
        }
    });
    if(listaDeFilmes.find(item => item.id === movie.id)){
        botaoFavoritar.checked = true;
    }
    return bannerFilme;
}


lista.results.forEach(movie => {
    elementoPaiDaLista.appendChild(criaFilme(movie))
})




const botaoFiltrar = document.querySelector("#onlyFavorites")

botaoFiltrar.addEventListener("change", function(){
    if (this.checked) {
        while(elementoPaiDaLista.firstChild){
            elementoPaiDaLista.removeChild(elementoPaiDaLista.firstChild);
        }
        listaDeFilmes.forEach(filme => elementoPaiDaLista.appendChild(criaFilme(filme)))
        if(listaDeFilmes.length == 0){
            elementoPaiDaLista.innerHTML = `<h2 class="titulo-principal">Busca não encontrada, não existem videos favoritados</h2>`
        }
      } else {
        while(elementoPaiDaLista.firstChild){
            elementoPaiDaLista.removeChild(elementoPaiDaLista.firstChild);
        }
        lista.results.forEach(movie => {
            elementoPaiDaLista.appendChild(criaFilme(movie))
        })
      }
})