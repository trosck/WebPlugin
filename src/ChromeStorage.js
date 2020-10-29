class ChromeStorage {
  set({ key, value }, cb=()=>{}) {
    chrome.storage.sync.set({ [key]: value }, cb)
  }
  get(key) {
    let data
    chrome.storage.sync.get([key], _data => data = _data)
    return data
  }
}
