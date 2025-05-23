let url_jopica_api;
let limite = 8;
let temporadas = [];
let temporadasArea = document.querySelector(".temporadas"); 

window.addEventListener("load", ()=>{
    pegarTemporadas().then(mostrarTemporadas);
})

document.querySelector("#tem").addEventListener("click", () => {
    if(limite > 100){
        console.log("Limite de 100 excedido! Por favor pesquise o ano no campo de busca")
    }else{
        limite+=8;
        pegarTemporadas().then(mostrarTemporadas);
    }
});

function mostrarTemporadas(){
    while (temporadasArea.firstChild) {
        temporadasArea.removeChild(temporadasArea.firstChild);
    }

    temporadas.forEach(temporada=>{
        const li = document.createElement("li");
        li.textContent = temporada;
        li.classList.add("temporada");
        temporadasArea.appendChild(li);
    })
}

function pegarTemporadas(){
    url_jopica_api = `https://api.jolpi.ca/ergast/f1/seasons?limit=${limite}`;

    return fetch(url_jopica_api) // Retorna a Promise do fetch
        .then(response => {
            return response.json();
        })
        .then(data=>{
            let listaTemporadas = data.MRData.SeasonTable.Seasons;
            temporadas = [];

            listaTemporadas.forEach(temporada => {
                let temporadaAno = temporada.season;
                let temporadaAnoCampeao = pegarCampeoes(temporadaAno).then((campeao)=>{
                    console.log(campeao); 
                });
                temporadas.push(temporada.season);
            })
            return temporadas; 
        })
        .catch(error=>{
            console.error(`Erro ao buscar temporadas: ${error}`)
            throw error; 
        });
}

function pegarCampeoes(temporada){
    let url_campeao = `https://api.jolpi.ca/ergast/f1/${temporada}/driverstandings/1/`;

    return fetch(url_campeao)
        .then((response)=>{
            return response.json();
        })
        .then((dado)=>{
            return dado.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver;
        })
}

function instanciarListaCorridas(temporada){
    url_jopica_api = `https://api.jolpi.ca/ergast/f1/${temporada}/`
    let corridas, listaObjetosCorrida = [];

    return fetch(url_jopica_api)
        .then(response =>{
            return response.json();
        })
        .then(data=>{
            corridas = data.MRData.RaceTable.Races;
            corridas.forEach(corrida => {
                const novaCorrida = new Corrida(
                    corrida.round,
                    corrida.raceName,
                    corrida.Circuit,
                    corrida.date,
                    corrida.time
                );
                listaObjetosCorrida.push(novaCorrida);
            });
            return listaObjetosCorrida;
        })
        .catch(error=>{
            console.error(error);
            throw error;
        });
}