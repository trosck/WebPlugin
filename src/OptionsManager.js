function OptionsManager(options, storage) {

  [].forEach.call(options, option => {

    option.el.addEventListener(events[option.type], event => {
      
      storage.set({
        key: option.prop,
        value: event.target.value,
      })
    })
  })
}
