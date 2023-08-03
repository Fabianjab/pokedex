let currentPokemon;
let offset = 20;

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
                <ul id="myUL">
                    <li>
                        <a href="#">
                            <h2>${newURL['name']}</h2> 
                        </a> 
                    </li>
                    <div id="number">Nr. ${newURL['id']}</div>
                </ul>
            </div>
            <img id="smallImg" src=${newURL['sprites']['front_shiny']}>
            <div id="typeInfos${i}">
                <div id="type"><b>type:</b>&nbsp; ${renderTypes(i)}</div>
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
        document.getElementById('left').style.display = "none";

    }
}

function swipeRight(index, i) {
    if (i < currentPokemon['results'].length) {
        specificInfos(currentPokemon['results'][i + 1]['url'], i + 1);
    }
}

function loadMore() {
    offset += 20;
    document.getElementById('pokedex').innerHTML = '';
    loadPokemon();
}
