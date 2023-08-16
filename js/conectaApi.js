async function getFilmes(){
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
    }
  };
  
    const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    const listaDeFilmes = await res.json();
    return listaDeFilmes;
}

async function pesquisaFilmes(titulo){
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
    }
  };
  
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${titulo}&include_adult=false&language=en-US&page=1`, options)
  const listaDeFilmesPesquisados = res.json();
  return listaDeFilmesPesquisados;
}

export const conexaoApi = {
    getFilmes,
    pesquisaFilmes
}
