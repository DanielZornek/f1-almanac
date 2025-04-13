url_jopica_api = "https://api.jolpi.ca/ergast/f1/2017/races";

fetch(url_jopica_api)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data.MRData.RaceTable.Races);
    })
    .catch(error =>{
        console.error(`Erro ao receber dados:/ ${error}`);
    })