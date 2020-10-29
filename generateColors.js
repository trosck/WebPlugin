const colors_container = document.getElementById("color")
const colors = CSS_COLOR_NAMES

colors.forEach(color => {
  const button = document.createElement("button")
  button.dataset.color = color
  button.style.backgroundColor = color
  button.style.width = "100%"
  button.style.height = "40px"

  const span = document.createElement("span")
  span.classList.add("button-span")
  span.textContent = color

  button.appendChild(span)
  window.requestAnimationFrame(( ) => colors_container.appendChild(button))
})

colors_container.addEventListener("click", event => {
  colors_container.value = event.target.closest("button").dataset.color
  const change_event = new Event("change")
  change_event.target = {
    value: color
  }
  colors_container.dispatchEvent(change_event)
})
