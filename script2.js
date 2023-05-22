let currentPokemon;

let colorTypes = {
    'fire': '#b50000',
    'water': 'blue',
    'grass': 'green',
    'rock': 'grey',
    'normal': '#ededed',
    'poison': 'purple',
    'bug': '#a89332',
    'ghost': '#3d667a',
    'electric': '#D9D326'
}


async function loadPokemon() {

    let url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Test', currentPokemon);

    for (let i = 0; i < currentPokemon['results'].length; i++) {
        const specialPokemon = currentPokemon['results'][i];
        
        await renderPokemonInfo(specialPokemon, i);
    }
}



async function renderPokemonInfo(index, i) {
    
    let url1 = index['url'];
    let response2 = await fetch(url1);
    newURL = await response2.json();
    console.log('1. Test', newURL);

  
    document.getElementById('pokedex').innerHTML += `
    <button onclick="specificInfos(newURL)" class="pokemonsCard" id="colorBackground${i}">
            <div class="centerPokemon" id="pokemons${i}">
                 <div id="headerRow">
                     <h1> ${newURL['name']} </h1>
                     <div id="number"> Nr. ${newURL['id']} </div>
                 </div>
            <img id="smallImg" src=${newURL['sprites']['front_shiny']}>
            <div id="typeInfos">
                 <div id="type"><b>types</b>:&nbsp;${newURL['types'][0]['type']['name']}<div>
            </div>
            </div>
    </button>
    `
    document.getElementById(`colorBackground${i}`).style.background = colorTypes[newURL['types'][0]['type']['name']];

}





function specificInfos(index) {


document.getElementById(`pokemon`).innerHTML = `
    <button id="curserOrder" onclick="removeCard()"> 
             <div id="bigInfoCard">
             <span id="cursers"> < </span>
             <div id="cardDesign">${index['name']}
             <img id="bigImgSize" src=${index['sprites']['other']['dream_world']['front_default']}>
             <div>
             <canvas id="myChart"></canvas>
            </div>
             </div>
             <span id="cursers"> > </span>
            </div>
    </button>
`
const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'Speed'],
    datasets: [{
      label: '# of Votes',
      data: [`${index['stats']['0']['base_stat']}`,`${index['stats']['1']['base_stat']}`,`${index['stats']['2']['base_stat']}`,`${index['stats']['3']['base_stat']}`,`${index['stats']['4']['base_stat']}`,`${index['stats']['5']['base_stat']}`],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

}
function removeCard() {
    document.getElementById('bigInfoCard').style.display="none";
}
