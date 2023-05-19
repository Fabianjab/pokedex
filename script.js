let currentPokemon;

async function loadPokemon() {

    let url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Test', currentPokemon);

    for (let i = 0; i < currentPokemon['results'].length; i++) {
        renderPokemonInfo(i);
    }
}



function renderPokemonInfo(index) {
    document.getElementById('pokemonName').innerHTML += `
    <div>${currentPokemon['results'][index]['name']}</div>
    <div>${currentPokemon['results'][index]['url']}</div>
    `;

let newPokemon = currentPokemon['results'][index];


// for (let j = 0; j < newPokemon.length; j++) {
//     const individuals = newPokemon[j];
    
//     document.getElementById('pokemonName').innerHTML += `
//         <div>${individuals[]}</div>`
// }

    

    // document.getElementById('smartPokemon').innerHTML = `<img src=${currentPokemon['sprites']['front_shiny']}>`;
    // document.getElementById('number').innerHTML = ` Nr. ${currentPokemon['id']}`;
    // document.getElementById('type').innerHTML = currentPokemon['types'][0]['type']['name'];
}
