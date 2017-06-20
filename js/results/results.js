import Application from '../application';
import WinView from './results-win.view';
import FailView from './results-fail.view';
import changeView from '../change-view';

class ResultsPresenter {
  /**
   * @constructor
   * @param {Results} results
   */
  constructor(results) {
    this.view = results.answers > 0 ? new WinView(results) : new FailView(results);

    this.view.onRestart = () => {
      Application.showWelcome();
    };
    changeView(this.view);
  }
}

export default ResultsPresenter;
