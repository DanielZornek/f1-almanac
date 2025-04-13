import { Corrida } from './Corrida.js';
const url_jopica_api = "https://api.jolpi.ca/ergast/f1/2017/races";

fetch(url_jopica_api)
    .then(response => {
        return response.json();
    })
    .then(data => {
        const listaCorridas = instanciarListaCorridas(data.MRData.RaceTable.Races);
        console.log(listaCorridas);
    })
    .catch(error =>{
        console.error(`Erro ao receber dados:/ ${error}`);
    })

function instanciarListaCorridas(corridas){
    let listaObjetosCorrida = [];
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
}