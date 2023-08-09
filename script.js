let currentPokemon;
let offset = 20;

let colorTypes = {
    'fire': 'linear-gradient(123deg, rgb(101 0 0), rgb(243 76 76 / 80%), rgb(255 0 0))',
    'water': 'linear-gradient(123deg, rgb(2 4 105), rgb(76 185 243 / 80%), rgb(0 112 255))',
    'grass': 'linear-gradient(123deg, rgb(5 101 0), rgb(76 243 136 / 80%), rgb(0 255 34))',
    'rock': 'grey',
    'normal': 'linear-gradient(123deg, rgb(177 167 167), rgb(251 251 251 / 80%), rgb(245 240 218))',
    'poison': 'linear-gradient(123deg, rgb(80 0 119), rgb(219 127 229 / 80%), rgb(154 32 213))',
    'bug': 'linear-gradient(123deg, rgb(105 84 2), rgb(239 243 76 / 80%), rgb(255 202 0))',
    'ghost': '#3d667a',
    'electric': '#D9D326'
}

async function loadPokemon() {

    let url = `https://pokeapi.co/api/v2/pokemon?limit=${offset}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Test', currentPokemon);

    for (let i = 0; i < currentPokemon['results'].length; i++) {
        const specialPokemon = currentPokemon['results'][i];
        await renderPokemonInfo(specialPokemon, i);
    }
    search();
}

async function renderPokemonInfo(index, i) {

    let url1 = index['url'];
    let response2 = await fetch(url1);
    newURL = await response2.json();
    console.log('1. Test', newURL);

    document.getElementById('pokedex').innerHTML += `
    <button onclick="specificInfos('${index['url']}', ${i})" class="pokemonsCard" id="colorBackground${i}">
        <div class="centerPokemon" id="pokemons${i}">
            <div id="headerRow">
                <div id="myUL">
                        <a href="#">
                            <h2>${newURL['name']}</h2> 
                        </a> 
                    <div id="number">Nr. ${newURL['id']}</div>
                </div>
            </div>
            <img id="smallImg" src=${newURL['sprites']['other']['dream_world']['front_default']}>
        </div>
        <div class="style_types">
        <div id="typeInfos${i}">
            <div id="type"> ${renderTypes(i)}</div>
        </div>
    </div>
    </button>
    `
    document.getElementById(`colorBackground${i}`).style.background = colorTypes[newURL['types'][0]['type']['name']];
}

function renderTypes() {
    let result = '';
    for (let b = 0; b < newURL['types'].length; b++) {
        result += `${newURL['types'][b]['type']['name']}&nbsp; `;
    }
    return result;
}

async function specificInfos(index, i) {

    let url1 = index;
    let response2 = await fetch(url1);
    newURL = await response2.json();
    console.log('2. Test', newURL);

    document.getElementById(`pokemon`).innerHTML = `
    <button id="curserOrder" onclick="removeCard()"> 
        <div id="bigInfoCard">
            <div id="left" onclick="swipeLeft('${index}', ${i})" class="cursers"> < </div>
                <div id="cardDesign">
                    <div id="nameBigCard">${newURL['name']}</div>
                    <img id="bigImgSize" src=${newURL['sprites']['other']['dream_world']['front_default']}>
                    <div><canvas id="myChart"></canvas></div>
                </div>
            <div onclick="swipeRight('${index}', ${i})" class="cursers"> > </div>
        </div>
    </button>
`;
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'Speed'],
            datasets: [{
                label: 'values',
                data: [`${newURL['stats']['0']['base_stat']}`, `${newURL['stats']['1']['base_stat']}`, `${newURL['stats']['2']['base_stat']}`, `${newURL['stats']['3']['base_stat']}`, `${newURL['stats']['4']['base_stat']}`, `${newURL['stats']['5']['base_stat']}`],
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
    document.getElementById('bigInfoCard').style.display = "none";
}

function swipeLeft(index, i) {
    if (i > 0) {
        specificInfos(currentPokemon['results'][i - 1]['url'], i - 1);
    } else {
        specificInfos(currentPokemon['results'][currentPokemon['results'].length - 1]['url'], currentPokemon['results'].length - 1);
    }
}

function swipeRight(index, i) {
    if (i < currentPokemon['results'].length - 1) {
        specificInfos(currentPokemon['results'][i + 1]['url'], i + 1);
    } else {
        specificInfos(currentPokemon['results'][0]['url'], 0);
    }
}

function loadMore() {
    offset += 20;
    document.getElementById('pokedex').innerHTML = '';
    loadPokemon();
}
