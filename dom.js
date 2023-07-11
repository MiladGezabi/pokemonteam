import { fetchData, fetchPokemon } from "./fetching.js";
import { notis } from "./function.js";

// Selektorer
const body = document.querySelector("body");
const findPokemonBtn = document.querySelector("#find-pokemon-btn");
const findPokemonView = document.querySelector("#find-pokemon");
const main = document.querySelector("main");
const searchInputContainer = document.querySelector("#search_input_container");
const searchInput = document.querySelector("#search_input");
const searchBtn = document.querySelector("#search_button");
const chooseCustomeNameOverlay = document.querySelector(".choose_name_overlay");
const chooseCustomeNamePopup = document.querySelector(".choose_name_popup");
const customNameInput = document.querySelector("#choose-name-input");
const customNameButtonContainer = document.querySelector(".choose-name-btn-container");
const teamContainer = document.querySelector(".team_container");
const teamCardsContainer = document.querySelector(".team_cards_container");
const backToTopBtn = document.querySelector(".back-to-top-btn");
const teamStatus = document.querySelector(".team-status");






// globala toggles
findPokemonView.classList.toggle("hide", true);
searchInput.classList.toggle("hide", true);
chooseCustomeNameOverlay.classList.toggle("hide", true);

window.onscroll = function() {scrollFunction()};







// globala variablar

let dataFromApi = null
let pokemonDataFromApi = null




// generella eventlyssnare.
chooseCustomeNameOverlay.addEventListener("click", () => {
  chooseCustomeNameOverlay.classList.toggle("hide", true);
})

chooseCustomeNamePopup.addEventListener("click", event => {
  event.stopPropagation()
})

backToTopBtn.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})







// Eventlyssnare för find pokemons knappen.

findPokemonBtn.addEventListener("click", () => {

  main.classList.toggle("hide", true)
  findPokemonBtn.classList.toggle("disable-button", true)
  findPokemonView.classList.toggle("hide", false)

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
  // ------------------------------------

  
  let searchOutputContainer = document.createElement("div");
  searchOutputContainer.classList.add("search_output_container");
  
  

  // Eventlyssnare för inputfältet.
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
  // ---------------------------


  

  

  
  // Eventlyssnare för load pokemon knappen.
  searchBtn.addEventListener("click",  async () => {
    
    searchInput.classList.toggle("hide", false);
    searchBtn.classList.toggle("disable-button", true)

    

    

        
    
    // Hämtar data from fetching.js
    try {
      
      dataFromApi = await fetchData()
      
      let pokemonNames = dataFromApi.results.map( pokemon => {
        return pokemon.name
      })
      

      for(let i = 0; i < pokemonNames.length; i++){

        pokemonDataFromApi = await fetchPokemon(pokemonNames[i])
        
  
        
  
        let image = pokemonDataFromApi.sprites.other["official-artwork"].front_default
        let pokeName = pokemonDataFromApi.name
        let abilityNames = pokemonDataFromApi.abilities.map(x => {
          return x.ability.name
        })
        
  
        let imageSpan = document.createElement("span")
        imageSpan.classList.add("image-box")
        let cardName = document.createElement("h3")
        cardName.classList.add("name-box")
        let cardAbility = document.createElement("p")
        cardAbility.classList.add("ability-box")
        let chooseBtnBox = document.createElement("div")
        chooseBtnBox.classList.add("choose_btn_box")
        let chooseBtnReserve = document.createElement("button")
        chooseBtnReserve.innerText = "Catch Pokemon"
        chooseBtnReserve.classList.add("choose_button", "reserve-button")
  
        
        chooseBtnBox.append(chooseBtnReserve)
        
      
        imageSpan.innerHTML = `<img class="pokemon-image" src="${image}" alt="${pokeName}" />`
        cardName.innerText = pokeName
        cardAbility.innerText = abilityNames.join(",  ")
      
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
      searchOutputContainer.remove()

      let errorMessage = document.createElement("p")
      errorMessage.innerText = "Something went wrong, please try again later"
      errorMessage.classList.add("errormessage")
      findPokemonView.append(errorMessage)
      errorMessage.scrollIntoView({behavior: "smooth"})
    }


    
    

       



    let chooseBtnReserveAll = document.querySelectorAll(".reserve-button")
        for(let i = 0; i < chooseBtnReserveAll.length; i++) {
          let button = chooseBtnReserveAll[i]
          button.addEventListener("click", event => {
            let Button = event.target
            let pokCard = Button.parentElement.parentElement
            let pokName = pokCard.getElementsByClassName("name-box")[0].innerText
            let pokAbility = pokCard.getElementsByClassName("ability-box")[0].innerText
            let pokImage = pokCard.getElementsByClassName("pokemon-image")[0].src
    
            renderReserveCard(pokImage, pokName, pokAbility)
            
            notis(body)
           
              
              
            

          })
        }

    
  })

  // ---------------------------------------------


  
  findPokemonView.append(closeOverlayBtn);
  findPokemonView.append(searchInputContainer);
  findPokemonView.append(searchOutputContainer);
  

})

// ------------------------------------------------






// Funktioner

// Flytar pokemon till team.
function renderCardInTeam(pokImage, pokName, pokAbility){
  let pokeCard = document.createElement("div")
  pokeCard.classList.add("pokemon-card")
  if(teamCardsContainer.children.length < 3){
    
    
    pokeCard.innerHTML = `
    <span class="image-box" > <img src="${pokImage}" alt="${pokName}" /> </span>
    <h3 class="name-box" > ${pokName} </h3>
    <p class="ability-box" > ${pokAbility} </p>
    <button class="choose_button rearange" > Rearange </button>
    <button class="choose_button custom-name" > Name your pokemon </button>
    <button class="choose_button move-to-reserve" > Move to reserve </button>
    `

    pokeCard.querySelector(".custom-name").addEventListener("click", () => {
      chooseCustomeNameOverlay.classList.toggle("hide", false)
      let customNameButton = document.createElement("button");
      customNameButton.innerText = "Accept"
      customNameButton.classList.add("choose_button");
      customNameButtonContainer.append(customNameButton);
      pokeCard.querySelector(".name-box").innerText = pokName
      
      customNameButton.addEventListener("click", () => {
        let nameInputValue = customNameInput.value
        let customName = pokeCard.querySelector(".name-box")
        let pokeName = customName.innerText
        customName.innerText = `${pokeName} "${nameInputValue}"`
        chooseCustomeNameOverlay.classList.toggle("hide", true)
        console.log("customNameButton clicked", customNameButton)
        customNameButton.remove()
      })
    })

    pokeCard.querySelector(".move-to-reserve").addEventListener("click", () => {
      renderReserveCard(pokImage, pokName, pokAbility)
      pokeCard.remove()
    })
    teamCardsContainer.append(pokeCard)

    pokeCard.querySelector(".rearange").addEventListener("click", () => {
      teamCardsContainer.prepend(pokeCard)
    })
    
  } else {

    }
}


// flyttar pokemons till reserve.
function renderReserveCard(pokImage, pokName, pokAbility) {
  let pokeCard = document.createElement("div")
  pokeCard.classList.add("pokemon-card")
  let reserveContainer = document.querySelector(".reserve_cards_container")

  pokeCard.innerHTML = `
  <span class="image-box" > <img src="${pokImage}" alt="${pokName}" /> </span>
  <h3 class="name-box" > ${pokName} </h3>
  <p class="ability-box" > ${pokAbility} </p>
  <button class="choose_button team-button" > Move to team </button>
  <button class="choose_button kick" > Kick </button>

  `
  pokeCard.querySelector("button").addEventListener("click", () => {
    if(teamCardsContainer.children.length < 3) {
      renderCardInTeam(pokImage, pokName, pokAbility)
      findPokemonBtn.scrollIntoView({behavior: "smooth"})
      pokeCard.remove()

      teamStatus.innerText = "Team status: Unfilled"

    }else {
      let slotFullOverlay = document.createElement("div")
      slotFullOverlay.classList.add("slot-full-overlay")
      let slotFullMessage = document.createElement("p")
      slotFullMessage.innerText = "Your team is full"
      slotFullMessage.classList.add("slot-full-message")
      
      
      slotFullOverlay.append(slotFullMessage)
      teamContainer.append(slotFullOverlay)
      slotFullOverlay.addEventListener("click", () => {
        slotFullOverlay.remove()
      })
    }
    if(teamCardsContainer.children.length == 3) {
      teamStatus.innerText = "Team status: Filled"
      
    }
    
  })

  pokeCard.querySelector(".kick").addEventListener("click", () => {
    pokeCard.remove()
  })

  reserveContainer.append(pokeCard)

}


function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}