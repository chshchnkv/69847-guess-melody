import data from './data';
import {isAnswerCorrect} from './data';
import welcomeScreen from './main-welcome';
import screenArtist from './main-level-artist';
import screenGenre from './main-level-genre';
import resultsScreen from './main-results';

/**
 * @function
 * @param {State} state
 * @param {boolean} isCorrect
 * @param {number} nextLevel
 */
const showNextScreen = (state, isCorrect, nextLevel) => {
  // TODO: isCorrect использовать для изменения количества доступных попыток и в зависимости от этого открывать уровень
  if (nextLevel) {
    renderScreen(Object.assign({}, state, {level: nextLevel}));
  } else {
    renderScreen(`results`);
  }
};

/**
 * @function
 * @param {State|string} state
 * @return {HTMLElement|DocumentFragment}
 */
const getStateScreen = (state) => {
  if (typeof state === `string`) {
    switch (state) {
      case `welcome`: return welcomeScreen();
      case `results`: {
        const results = Math.trunc(Math.random() * 100) % 2 === 0 ? {melodies: 0, percent: 0} : {melodies: Math.trunc(Math.random() * 10), percent: Math.trunc(Math.random() * 100)};
        return resultsScreen(results);
      }
    }
  } else {
    const currentQuestion = data.questions[state.level];

    switch (currentQuestion.type) {
      case `artist`: return screenArtist(currentQuestion);
      case `genre`: return screenGenre(currentQuestion);
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
      showNextScreen(state, isAnswerCorrect(currentQuestion, event.detail), currentQuestion.next);
    });
  }
};

export default renderScreen;
