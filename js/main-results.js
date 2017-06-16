import showScreen from './show-screen';
import {getInitialState} from './state';
import WinView from './results-win.view';
import FailView from './results-fail.view';

export default (results) => {
  const resultsView = results.answers > 0 ? new WinView(results) : new FailView(results);
  resultsView.onRestart = () => {
    showScreen(getInitialState());
  };
  return resultsView.element;
};
