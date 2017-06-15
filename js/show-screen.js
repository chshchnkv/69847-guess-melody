import data from './data';
import {RESULTS_LEVEL, WELCOME_LEVEL} from './state';
import welcomeScreen from './main-welcome';
import resultsScreen from './main-results';
import levelScreen from './main-level';

/**
 * @function
 * @param {State|string} state
 * @return {HTMLElement}
 */
const getStateScreen = (state) => {
  switch (state.level) {
    case WELCOME_LEVEL: return welcomeScreen();
    case RESULTS_LEVEL: {
      return resultsScreen({answers: state.answers, percent: 60});
    }
    default: {
      return levelScreen(state, data.questions[state.level]);
    }
  }
};

/**
 * Блок с содержимым экрана
 * @type {HTMLElement}
 */
const appElement = document.querySelector(`.app`);

/**
 * Показывает экран по текущему состоянию
 * @function
 * @param {State|string} [state] - состояние
 */
const showScreen = (state) => {
  appElement.replaceChild(getStateScreen(state), appElement.firstElementChild);
};

export default showScreen;
