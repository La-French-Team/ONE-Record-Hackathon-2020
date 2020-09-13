const { decorate, observable, action } = require('mobx');

class SettingsStore {
  darkTheme = false;

  toggleTheme() {
    this.darkTheme = !this.darkTheme;
  }

  reset() {
    this.darkTheme = false;
  }
}

decorate(SettingsStore, {
  darkTheme: observable,
  toggleTheme: action
});

export default new SettingsStore();
