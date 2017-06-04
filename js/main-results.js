import getElementFromTemplate from './templates';
import logo from './logo';
import showScreen from './show-screen';

/**
 * @typedef {Object} Results
 * @property {number} melodies
 * @property {number} percent
 */

/**
 * @param {Results} results
 * @return {DocumentFragment}
 */
const resultElement = (results) => {
  if (results.melodies > 0) {
    return getElementFromTemplate(`\
      <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">За&nbsp;2&nbsp;минуты<br>вы&nbsp;отгадали ${results.melodies}&nbsp;мелодии</div>
      <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${results.percent}%&nbsp;игроков</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    `);
  } else {
    return getElementFromTemplate(`\
      <h2 class="title">Вы проиграли</h2>
      <div class="main-stat">Ничего, вам повезет в следующий раз</div>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>    
    `);
  }
};

export default (results) => {
  const container = getElementFromTemplate(`<section class="main main--result"></section>`);
  const section = container.firstElementChild;
  section.appendChild(logo());

  const element = resultElement(results);
  const replayButton = element.querySelector(`.main-replay`);
  replayButton.addEventListener(`click`, (event) => {
    event.preventDefault();
    showScreen(`welcome`);
  });
  section.appendChild(element);

  return container;
};
