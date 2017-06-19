import welcome from './welcome/welcome';
import results from './results/results';
import game from './game/game';

/**
 * @enum {string}
 */
const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  RESULTS: `results`
};

const getControllerIdFromHash = (hash) => hash.replace(`#`, ``);

class App {
  constructor() {
    this.routes = {
      [ControllerId.WELCOME]: welcome,
      [ControllerId.RESULTS]: results,
      [ControllerId.GAME]: game
    };

    window.onhashchange = () => this.init();
  }

  init() {
    this.changeController(getControllerIdFromHash(location.hash));
  }

  changeController(route = ``) {
    const controller = this.routes[route];
    if (this._results) {
      controller.init(this._results);
    } else {
      controller.init();
    }
  }

  showWelcome() {
    location.hash = ControllerId.WELCOME;
  }

  showGame() {
    this._results = null;
    location.hash = ControllerId.GAME;
  }

  /**
   * @function
   * @param {Results} resultsData
   */
  showResults(resultsData) {
    this._results = resultsData;
    location.hash = ControllerId.RESULTS;
  }
}

const app = new App();
export default app;
