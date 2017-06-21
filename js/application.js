import welcomePresenter from './welcome/welcome';
import resultsPresenter from './results/results';
import gamePresenter from './game/game';

/**
 * @enum {string}
 */
const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  RESULTS: `results`
};

/**
 * @function
 * @param {string} hash
 * @return {string}
 */
const getPresenterIdFromHash = (hash) => hash.replace(`#`, ``);

/**
 * @class
 */
class Application {
  /**
   * @constructor
   */
  constructor() {
    /**
     * @enum {AbstractPresenter}
     */
    this.routes = {
      [ControllerId.WELCOME]: welcomePresenter,
      [ControllerId.RESULTS]: resultsPresenter,
      [ControllerId.GAME]: gamePresenter
    };

    window.onhashchange = () => this.init();
  }

  /**
   * Обрабатывает хэш и показывает сразу нужный презентер
   * @function
   */
  init() {
    this.changeController(getPresenterIdFromHash(location.hash));
  }

  /**
   * @function
   * @param {string} [route = ``]
   */
  changeController(route = ``) {
    const routeId = route.split(`/`)[0];
    /** @type {AbstractPresenter} */
    const presenter = this.routes[routeId];

    if (routeId === ControllerId.RESULTS) {
      const results = JSON.parse(atob(location.hash.split(`/`)[1]));
      presenter.init(results);
    } else {
      presenter.init();
    }
  }

  /**
   * @function
   */
  static showWelcome() {
    location.hash = ControllerId.WELCOME;
  }

  /**
   * @function
   */
  static showGame() {
    location.hash = ControllerId.GAME;
  }

  /**
   * @function
   * @param {Results} resultsData
   */
  static showResults(resultsData) {
    location.hash = `${ControllerId.RESULTS}/${btoa(JSON.stringify(resultsData))}`;
  }
}

/**
 * @type {Application}
 */
const application = new Application();
export default application;
