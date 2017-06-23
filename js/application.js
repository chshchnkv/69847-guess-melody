import welcomePresenter from './welcome/welcome';
import resultsPresenter from './results/results';
import GamePresenter from './game/game';
import Model from './model';
import defaultAdapter from './model-adapter';
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
  constructor() {
    /**
     * @type {Model}
     */
    this.model = new class extends Model {
      get urlRead() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody/questions`;
      }
    }();

    window.onhashchange = () => this.changeController(getPresenterIdFromHash(location.hash));
  }

  /**
   * Обрабатывает хэш и показывает сразу нужный презентер
   * @function
   */
  init() {
    this.model.load(defaultAdapter)
      .then((data) => this.setup(data))
      .then(() => this.changeController(getPresenterIdFromHash(location.hash)));
  }

  setup(data) {
    /**
     * @enum {AbstractPresenter}
     */
    this.routes = {
      [ControllerId.WELCOME]: welcomePresenter,
      [ControllerId.RESULTS]: resultsPresenter,
      [ControllerId.GAME]: new GamePresenter(data)
    };
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
