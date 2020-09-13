const { decorate, observable, action } = require('mobx');

class SettingsStore {
  darkTheme = JSON.parse(window.localStorage.getItem('darkTheme')) || false;

  toggleTheme() {
    this.darkTheme = !this.darkTheme;
    window.localStorage.setItem('darkTheme', JSON.stringify(this.darkTheme));
  }

  reset() {
    this.darkTheme = false;
    window.localStorage.setItem('darkTheme', JSON.stringify(false));
  }
}

decorate(SettingsStore, {
  darkTheme: observable,
  toggleTheme: action
});

export default new SettingsStore();
