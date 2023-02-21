// Selektorer
const body = document.querySelector("body");
const findPokemonBtn = document.querySelector("#find-pokemon-btn");






console.log("hello")








// Eventlyssnare

findPokemonBtn.addEventListener("click", () => {


  // Element som skapas när man klickar på knappen.
  let searchOverlay = document.createElement("div");
  searchOverlay.classList.add("search_overlay");

  let searchPopup = document.createElement("div");
  searchPopup.classList.add("search_popup");

  let closeOverlayBtn = document.createElement("button");
  closeOverlayBtn.classList.add("close_button");
  closeOverlayBtn.innerText = "Close";

  // Eventlyssnare för close knappen.
  closeOverlayBtn.addEventListener("click", () => {
    searchOverlay.remove()
  })

  let searchInputContainer = document.createElement("div");
  searchInputContainer.classList.add("search_input_container");

  let searchOutputContainer = document.createElement("div");
  searchOutputContainer.classList.add("search_output_container");

  let searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Insert Pokemon name here"
  searchInput.classList.add("search_input");

  let searchBtn = document.createElement("button");
  searchBtn.classList.add("search_button");
  searchBtn.innerText = "Search";

  let searchOutPutList = document.createElement("ul")

  // Eventlyssnare för search knappen.
  searchBtn.addEventListener("click", async () => {

    let searchString = searchInput.value
    let url = `https://pokeapi.co/api/v2/pokemon/` + searchString

    

    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log("pokemon data = ", data)

      let image = data.sprites.other["official-artwork"].front_default
      let name = data.name
      let ability = data.abilities.forEach(abily => {
        abily.ability.name
      })

      let imageSpan = document.createElement("span")
      imageSpan.classList.add("image-box")
      let nameSpan = document.createElement("span")
      nameSpan.classList.add("name-box")
      let abilitySpan = document.createElement("span")
      abilitySpan.classList.add("ability-box")
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
      
    
      imageSpan.innerHTML = `<img src="${image}" alt="${name}" />`
      nameSpan.innerText = name
      abilitySpan.innerText = ability
    
      let li = document.createElement("li")
      li.append(imageSpan)
      li.append(nameSpan)
      li.append(abilitySpan)
      li.append(chooseBtnBox)
    
      searchOutPutList.append(li)
      

    } catch(error) {
      console.log("ett fel har inträffats: ", error.message)
      searchOutPutList.remove()

      let errorMessage = document.createElement("p")
      errorMessage.innerText = "Something went wrong, please try again later"
      errorMessage.classList.add("errorMessage")
    }

    
  })


  // Alla element som skapades läggs in id DOM.
  body.append(searchOverlay)
  searchOverlay.append(searchPopup);
  searchPopup.append(closeOverlayBtn);
  searchPopup.append(searchInputContainer);
  searchPopup.append(searchOutputContainer);
  searchOutputContainer.append(searchOutPutList)
  searchInputContainer.append(searchInput);
  searchInputContainer.append(searchBtn);
  

})






// Funktioner

// funktion som visar pokemon.
// function renderPokemon(image, name, ability) {
//   let imageSpan = document.createElement("span")
//   let nameSpan = document.createElement("span")
//   let abilitySpan = document.createElement("span")

//   imageSpan.innerHTML = image
//   nameSpan.innerText = name
//   abilitySpan.innerText = ability

//   let li = document.createElement("li")
//   li.append(imageSpan)
//   li.append(nameSpan)
//   li.append(abilitySpan)

//   searchOutPutList.append(li)
// }