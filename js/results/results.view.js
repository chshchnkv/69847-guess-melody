import AbstractView from '../abstract-view';
import logo from '../logo';

/**
 * @typedef {Object} Results
 * @property {number} answers
 * @property {number} time
 * @property {number} score
 */

/**
 * @class
 * @extends AbstractView
 */
class ResultsView extends AbstractView {

  /**
   * @constructor
   * @param {Results[] | Results} results
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
    const resultsScreen = super.render();
    resultsScreen.insertBefore(logo(), resultsScreen.firstElementChild);
    return resultsScreen;
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
