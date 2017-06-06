import getElementFromTemplate from './templates';
import logo from './logo';
import showScreen from './show-screen';

/**
 * @typedef {Object} State
 * @property {string} level
 * @property {number} lives
 * @property {number} time
 * @type {State}
 */
const initialState = Object.freeze({
  level: 0,
  lives: 3,
  time: 0
});

export default () => {
  const welcomeScreen = getElementFromTemplate(`<section class="main main--welcome"></section>`);
  const section = welcomeScreen.firstElementChild;
  section.appendChild(logo());
  section.appendChild(getElementFromTemplate(`\
      <button class="main-play">Начать игру</button>
      <h2 class="title main-title">Правила игры</h2>
      <p class="text main-text">
        Правила просты&nbsp;— за&nbsp;2 минуты дать
        максимальное количество правильных ответов.<br>
        Удачи!
      </p>`));

  const playButtonElement = welcomeScreen.querySelector(`.main-play`);
  playButtonElement.addEventListener(`click`, (event) => {
    event.preventDefault();
    showScreen(initialState);
  });
  return welcomeScreen;
};
