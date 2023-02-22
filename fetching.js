


async function fetchPokemon(name) {
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`

    let response = await fetch(url);
    let data = await response.json();

    return data
}


async function fetchData() {
    
    let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`

    let response = await fetch(url);
    let data = await response.json();
    
    return data
}


export {fetchData, fetchPokemon}