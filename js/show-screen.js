import questions from './data';
import welcomeScreen from './main-welcome';
import screenArtist from './main-level-artist';
import screenGenre from './main-level-genre';
import resultsScreen from './main-results';

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
  if (typeof state === `string`) {
    switch (state) {
      case `welcome`: {
        appElement.replaceChild(welcomeScreen(), appElement.firstElementChild);
        break;
      }

      case `results`: {
        const results = Math.trunc(Math.random() * 100) % 2 === 0 ? {melodies: 0, percent: 0} : {melodies: Math.trunc(Math.random() * 10), percent: Math.trunc(Math.random() * 100)};
        appElement.replaceChild(resultsScreen(results), appElement.firstElementChild);
        break;
      }
    }
  } else {
    const currentQuestion = questions[state.level];
    const nextQuestion = currentQuestion.next;
    let screenFragment = null;
    let correctAnswer = false;

    const goNext = () => {
      if (correctAnswer && nextQuestion) {
        renderScreen(Object.assign({}, state, {level: nextQuestion}));
      } else {
        renderScreen(`results`);
      }
    };

    const onAnswer = (event) => {
      event.preventDefault();
      correctAnswer = true;
      goNext();
    };

    switch (currentQuestion.type) {
      case `artist`: {
        screenFragment = screenArtist(currentQuestion);
        break;
      }
      case `genre`: {
        screenFragment = screenGenre(currentQuestion);
        break;
      }
    }
    appElement.replaceChild(screenFragment, appElement.firstElementChild);
    const screenElement = appElement.firstElementChild;
    screenElement.addEventListener(`answer`, onAnswer);
  }
};

export default renderScreen;
