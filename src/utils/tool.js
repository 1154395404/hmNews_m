export default {
  getItem (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  setItem (key, val) {
    localStorage.setItem(key, JSON.stringify(val))
  }

}
