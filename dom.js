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

  let searchInputContainer = document.createElement("div");
  searchInputContainer.classList.add("search_input_container");

  let searchOutputContainer = document.createElement("div");
  searchOutputContainer.classList.add("search_output_container");

  let searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.classList.add("search_input");

  let searchBtn = document.createElement("button");
  searchBtn.classList.add("seach_button");
  searchBtn.innerText = "Search";


  // Alla element som skapades läggs in id DOM.
  body.append(searchOverlay)
  searchOverlay.append(searchPopup);
  searchPopup.append(closeOverlayBtn);
  searchPopup.append(searchInputContainer);
  searchPopup.append(searchOutputContainer);
  searchInputContainer.append(searchInput);
  searchInputContainer.append(searchBtn);
  

})