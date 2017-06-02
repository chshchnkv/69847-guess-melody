import getElementFromTemplate from './templates';
import showScreen from './show-screen';
import welcomeScreen from './main-welcome';
import logo from './logo';

const container = getElementFromTemplate(`<section class="main main--result"></section>`);
const section = container.firstElementChild;
section.appendChild(logo);

const resultElement = (fail = false) => {
  if (fail) {
    return getElementFromTemplate(`\
      <h2 class="title">Вы проиграли</h2>
      <div class="main-stat">Ничего, вам повезет в следующий раз</div>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>    
    `);
  } else {
    return getElementFromTemplate(`\
      <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">За&nbsp;2&nbsp;минуты<br>вы&nbsp;отгадали 4&nbsp;мелодии</div>
      <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    `);
  }
};

const returnElement = Math.trunc(Math.random() * 100) % 2 === 0 ? resultElement() : resultElement(true);
const replayElement = returnElement.querySelector(`.main-replay`);
const onReplayClick = (event) => {
  event.preventDefault();
  showScreen(welcomeScreen);
};
replayElement.addEventListener(`click`, onReplayClick);

section.appendChild(returnElement);

export default container;
