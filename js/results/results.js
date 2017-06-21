import application from '../application';
import WinView from './results-win.view';
import FailView from './results-fail.view';
import changeView from '../change-view';
import AbstractPresenter from '../abstract-presenter';

class ResultsPresenter extends AbstractPresenter {
  /**
   * @function
   * @override
   * @param {Results} results
   */
  init(results) {
    this.view = results.answers > 0 ? new WinView(results) : new FailView(results);

    this.view.onRestart = () => {
      application.constructor.showWelcome();
    };
    changeView(this.view);
  }
}

const resultsPresenter = new ResultsPresenter();
export default resultsPresenter;
