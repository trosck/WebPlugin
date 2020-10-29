const config = {
  dev: false,
}

function devLog() {
  if (config.dev) {
    console.log.apply(null, arguments)
  }
}

devLog("init plugin")

class Listener {

  constructor() {
    devLog("constructor", this)

    this.clickListener = this.clickListener.bind(this)
    this.keyupListener = this.keyupListener.bind(this)
    this.keydownListener = this.keydownListener.bind(this)
    this.mouseoverListener = this.mouseoverListener.bind(this)

    window.addEventListener("keydown", this.keydownListener)
  }

  keydownListener(event) {
    window.addEventListener("click", this.clickListener)
    window.addEventListener("keyup", this.keyupListener)
    window.addEventListener("mouseover", this.mouseoverListener)
  }
  mouseoverListener(event) { }
  keyupListener(event) {
    window.removeEventListener("mouseover", this.mouseoverListener)
    window.removeEventListener("keyup", this.keyupListener)
    window.removeEventListener("click", this.clickListener)
  }
  clickListener(event) {
    event.preventDefault()
    event.stopPropagation()
  }
  destroy() {
    this.keyupListener()
    window.removeEventListener("keydown", this.keydownListener)
  }
}

class DeleteHTML extends Listener {
  constructor({ color, height }) {
    super()
    this.color = color
    this.height = height
    this.timeout = null
    this.lastTarget = null
  }

  keydownListener(event) {
    devLog("ctrl?", event.ctrlKey, event)

    if (!event.ctrlKey) return

    this.lastTarget = event.target

    super.keydownListener(event)
  }
  
  mouseoverListener(event) {
    devLog("mouseoverlistener")
    const target = event.target
  
    if (!this.lastTarget) {
      target.style.outline = this.height + "px solid " + this.color
      this.lastTarget = target
    }
  
    if (target !== this.lastTarget) {
      target.style.outline = this.height + "px solid " + this.color
      this.lastTarget.style.outline = "none"
      this.lastTarget = target
    }
  }
  
  keyupListener(event) {
    devLog("keyuplistener")
    super.keyupListener(event)

    if (this.lastTarget) {
      this.lastTarget.style.outline = "none"
      this.lastTarget = null
    }
  }
  
  clickListener(event) {
    devLog("clicklistener")
    super.clickListener(event)
    const target = event.target
    target.parentNode.removeChild(target)
  }
}

let deleter

const options = {
  height: 2,
  color: "red",
}

Object.keys(options).forEach(key => {
  setListenerOnDataChanges(key)

  Object.defineProperty(options, "set_" + key, {
    set: function(val) {
      this[key] = val
      
      deleter.destroy()
      deleter = new DeleteHTML(this)
    }
  })
})

function setListenerOnDataChanges(prop) {
  chrome.storage.sync.get(
    prop, 
    data => data ? options[prop] = data[prop] : null
  )

  chrome.storage.onChanged.addListener(changes => {
    const changed = changes[prop]
    if (changed) {
      options["set_" + prop] = changed.newValue
    }
  })
}

deleter = new DeleteHTML(options)
