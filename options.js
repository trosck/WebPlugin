const options = [].map.call(
  document.querySelectorAll("[data-option]"), 
  el => new OptionsElement(el)
)

new OptionsManager(options, new ChromeStorage())
