import { fetchData, fetchPokemon } from "./fetching.js";

// Selektorer
const body = document.querySelector("body");
const findPokemonBtn = document.querySelector("#find-pokemon-btn");
const findPokemonView = document.querySelector("#find-pokemon");
const main = document.querySelector("main");
const searchInputContainer = document.querySelector("#search_input_container")
const searchInput = document.querySelector("#search_input");
const searchBtn = document.querySelector("#search_button");



findPokemonView.classList.toggle("hide", true)


console.log("hello")


// globala variablar

let dataFromApi = null
let pokemonDataFromApi = null
let pokeName






// Eventlyssnare

findPokemonBtn.addEventListener("click", () => {

  main.classList.toggle("hide", true)
  findPokemonBtn.classList.toggle("disable-button", true)
  findPokemonView.classList.toggle("hide", false)
  searchInput.classList.toggle("hide", true)

  // Element som skapas när man klickar på knappen.

  let searchPopup = document.createElement("div");
  searchPopup.classList.add("search_popup");

  let closeOverlayBtn = document.createElement("button");
  closeOverlayBtn.classList.add("close_button");
  closeOverlayBtn.innerText = "Back";

  // Eventlyssnare för back knappen.
  closeOverlayBtn.addEventListener("click", () => {
    main.classList.toggle("hide", false)
    findPokemonBtn.classList.toggle("disable-button", false)
    findPokemonView.classList.toggle("hide", true)
  })

  
  let searchOutputContainer = document.createElement("div");
  searchOutputContainer.classList.add("search_output_container");
  
  

  
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const cardNameToLowerCase = document.querySelectorAll(".name-box");
    
    cardNameToLowerCase.forEach((pokeBox) => {
      pokeBox.parentElement.style.display = "block";

      if (!pokeBox.innerHTML.toLowerCase().includes(value)) {
        pokeBox.parentElement.style.display = "none";
      }
    })
    
    

    
  })
  
  // Eventlyssnare för search knappen.
  searchBtn.addEventListener("click",  async () => {
    
    searchInput.classList.toggle("hide", false);
    searchBtn.classList.toggle("disable-button", true)

    

    

    try {
      
      dataFromApi = await fetchData()
      console.log("här kommer data från api = ", dataFromApi)
      let pokemonNames = dataFromApi.results.map( pokemon => {
        return pokemon.name
      })
      console.log("pokemon", pokemonNames)

      for(let i = 0; i < pokemonNames.length; i++){

        pokemonDataFromApi = await fetchPokemon(pokemonNames[i])
        console.log("här kommer lite mer data ", pokemonDataFromApi)
  
        
  
        let image = pokemonDataFromApi.sprites.other["official-artwork"].front_default
        pokeName = pokemonDataFromApi.name
        let abilityNames = pokemonDataFromApi.abilities.map(x => {
          return x.ability.name
        })
        console.log("abilityname kommer här ", abilityNames)
        
  
        let imageSpan = document.createElement("span")
        imageSpan.classList.add("image-box")
        let cardName = document.createElement("h3")
        cardName.classList.add("name-box")
        let cardAbility = document.createElement("p")
        cardAbility.classList.add("ability-box")
        let chooseBtnBox = document.createElement("div")
        chooseBtnBox.classList.add("choose_btn_box")
        let chooseBtnTeam = document.createElement("button")
        chooseBtnTeam.innerText = "Put in team"
        chooseBtnTeam.classList.add("choose_button")
        let chooseBtnReserve = document.createElement("button")
        chooseBtnReserve.innerText = "Put in reserve"
        chooseBtnReserve.classList.add("choose_button")
  
        chooseBtnBox.append(chooseBtnTeam)
        chooseBtnBox.append(chooseBtnReserve)
        
      
        imageSpan.innerHTML = `<img src="${image}" alt="${pokeName}" />`
        cardName.innerText = pokeName
        cardAbility.innerText = abilityNames.join(", ")
      
        let pokemonCard = document.createElement("div")
        pokemonCard.classList.add("pokemon-card")
        pokemonCard.append(imageSpan)
        pokemonCard.append(cardName)
        pokemonCard.append(cardAbility)
        pokemonCard.append(chooseBtnBox)
      
        searchOutputContainer.append(pokemonCard)
      }
      

    } catch(error) {
      console.log("ett fel har inträffats: ", error.message)
      searchOutPutList.remove()

      let errorMessage = document.createElement("p")
      errorMessage.innerText = "Something went wrong, please try again later"
      errorMessage.classList.add("errormessage")
    }

    
  })


  
  findPokemonView.append(closeOverlayBtn);
  findPokemonView.append(searchInputContainer);
  findPokemonView.append(searchOutputContainer);
  

})






// Funktioner