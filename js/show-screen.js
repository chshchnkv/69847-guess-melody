import data from './data';
import welcomeScreen from './main-welcome';
import screenArtist from './main-level-artist';
import screenGenre from './main-level-genre';
import resultsScreen from './main-results';

/**
 * @function
 * @param {State} state
 * @param {boolean} isAnswerCorrect
 * @param {number} nextLevel
 */
const showNextScreen = (state, isAnswerCorrect, nextLevel) => {
  if (isAnswerCorrect && nextLevel) {
    renderScreen(Object.assign({}, state, {level: nextLevel}));
  } else {
    renderScreen(`results`);
  }
};

/**
 * @function
 * @param {Question} question
 * @param {Answer[]} answers
 * @return {boolean}
 */
const isAnswerCorrect = (question, answers) => {
  const compareAnswers = (a1, a2) => {
    if (a1.id > a2.id) {
      return 1;
    }

    if (a1.id < a2.id) {
      return -1;
    }

    return 0;
  };

  const correctAnswers = question.answers.filter((answer) => {
    return answer.isCorrect;
  }).sort(compareAnswers);

  if (correctAnswers.length !== answers.length) {
    return false;
  }

  const givenAnswers = answers.slice(0).sort(compareAnswers);
  return givenAnswers.every((answer, index) => {
    return answer.id === correctAnswers[index].id;
  });
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
