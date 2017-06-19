import App from '../application';
import WinView from './results-win.view';
import FailView from './results-fail.view';
import changeView from '../change-view';

class Results {
  init(results) {
    this.view = results.answers > 0 ? new WinView(results) : new FailView(results);

    this.view.onRestart = () => {
      App.showWelcome();
    };
    changeView(this.view);
  }
}

const results = new Results();
export default results;
