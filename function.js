
export function notis(b) {
  let body = b
  let notis = document.createElement("div")
  notis.classList.add("notis")
  notis.innerText = "Pokemon caught!"

  body.append(notis)

  setTimeout(() => {
    notis.remove()
  }, 1000);

  
}

