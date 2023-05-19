let currentPokemon;

let grass = style.color = "green";


async function loadPokemon() {

    let url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Test', currentPokemon);

    for (let i = 0; i < currentPokemon['results'].length; i++) {
        const specialPokemon = currentPokemon['results'][i];
        
        renderPokemonInfo(specialPokemon, i);
    }
}



async function renderPokemonInfo(index, i) {
    
    let url1 = index['url'];
    let response2 = await fetch(url1);
    newURL = await response2.json();
    console.log('1. Test', newURL);

    if (${newURL['types'][0]['type']['name']} == grass) 
    { class:"pokemonCard".style.background-color = "green";
        } else {
        
    },



    document.getElementById('pokedex').innerHTML += `
    <div class="pokemonsCard" id="pokemons${i}">
        <div id="headerRow">
            <h1> ${newURL['name']} </h1>
            <div id="number"> Nr. ${newURL['id']} </div>
        </div>
        <img id="smallImg" src=${newURL['sprites']['front_shiny']}>
        <div id="typeInfos">
            <div id="type"><b>types</b>:&nbsp; &nbsp; &nbsp; ${newURL['types'][0]['type']['name']} </div>
            <div id="type">${newURL['types'][1]['type']['name']} </div> 
        </div>
    </div>
    `
}

