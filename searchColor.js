const search_colors = document.getElementById("search_colors")
search_colors.addEventListener("input", event => {
  const { value } = event.target
  const colors = document.getElementById("color").childNodes
  window.requestAnimationFrame(( ) => {
    colors.forEach(el => {
      const search = value.toLowerCase()
      const text = el.textContent.toLowerCase()
      if (text.includes(search)) {
        el.style.display = "block"
      }
      else {
        el.style.display = "none"
      }
    })
  })
})
