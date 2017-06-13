import data from './data';
import {applyAnswer, RESULTS_LEVEL, WELCOME_LEVEL} from './data';
import welcomeScreen from './main-welcome';
import screenArtist from './main-level-artist';
import screenGenre from './main-level-genre';
import resultsScreen from './main-results';

/**
 * @function
 * @param {State|string} state
 * @return {HTMLElement|DocumentFragment}
 */
const getStateScreen = (state) => {
  switch (state.level) {
    case WELCOME_LEVEL: return welcomeScreen();
    case RESULTS_LEVEL: {
      return resultsScreen({answers: state.answers, percent: 60});
    }
    default: {
      const currentQuestion = data.questions[state.level];

      switch (currentQuestion.type) {
        case `artist`: return screenArtist(currentQuestion);
        case `genre`: return screenGenre(currentQuestion);
      }
    }
  }
  return null;
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
const renderScreen = (state) => {
  let screenFragment = getStateScreen(state);
  appElement.replaceChild(screenFragment, appElement.firstElementChild);

  if (typeof state === `object`) {
    const currentQuestion = data.questions[state.level];
    const screenElement = appElement.firstElementChild;
    screenElement.addEventListener(`answer`, (event) => {
      event.preventDefault();
      renderScreen(applyAnswer(state, currentQuestion, event.detail));
    });
  }
};

export default renderScreen;
