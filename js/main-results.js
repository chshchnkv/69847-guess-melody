import getElementFromTemplate from './templates';
import logo from './logo';
import showScreen from './show-screen';
import {getInitialState} from './state';

/**
 * @typedef {Object} Results
 * @property {number} answers
 * @property {number} percent
 */

/**
 * @param {Results} results
 * @return {Node}
 */
const resultElement = (results) => {
  if (results.answers > 0) {
    return getElementFromTemplate(`\
      <section class="main main--result">
        <h2 class="title">Вы настоящий меломан!</h2>
        <div class="main-stat">За&nbsp;2&nbsp;минуты<br>вы&nbsp;отгадали ${results.answers}&nbsp;мелодии</div>
        <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${results.percent}%&nbsp;игроков</span>
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>
    `);
  } else {
    return getElementFromTemplate(`\
      <section class="main main--result">
        <h2 class="title">Вы проиграли</h2>
        <div class="main-stat">Ничего, вам повезет в следующий раз</div>
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>
    `);
  }
};

export default (results) => {
  const container = resultElement(results);
  container.insertBefore(logo(), container.firstElementChild);

  const replayButton = container.querySelector(`.main-replay`);
  replayButton.addEventListener(`click`, (event) => {
    event.preventDefault();
    showScreen(getInitialState());
  });

  return container;
};
