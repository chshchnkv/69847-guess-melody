import AbstractView from './abstract-view';
import logo from './logo';

/**
 * @typedef {Object} Results
 * @property {number} answers
 * @property {number} percent
 */

/**
 * @class
 * @extends AbstractView
 */
class ResultsView extends AbstractView {

  /**
   * @constructor
   * @param {Results} results
   */
  constructor(results) {
    super();
    this._results = results;
  }

  /**
   * @function
   * @override
   */
  render() {
    const welcomeScreen = super.render();
    welcomeScreen.insertBefore(logo(), welcomeScreen.firstElementChild);
    return welcomeScreen;
  }

  /**
   * @function
   * @override
   */
  bind() {
    const replayButton = this.element.querySelector(`.main-replay`);
    replayButton.addEventListener(`click`, (event) => {
      event.preventDefault();
      this.onRestart();
    });
  }

  /**
   * @function
   */
  onRestart() {}
}

export default ResultsView;
