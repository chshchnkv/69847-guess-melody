import getElementFromTemplate from './templates';
import logo from './logo';
import artistScreen from './main-level-artist';
import showScreen from './show-screen';

const welcomeScreen = getElementFromTemplate(`<section class="main main--welcome"></section>`);
const section = welcomeScreen.firstElementChild;

section.appendChild(logo);
section.appendChild(getElementFromTemplate(`\
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;2 минуты дать
      максимальное количество правильных ответов.<br>
      Удачи!
    </p>`));

const playButtonElement = welcomeScreen.querySelector(`.main-play`);
const onPlayButtonClick = (event) => {
  event.preventDefault();
  showScreen(artistScreen);
};

playButtonElement.addEventListener(`click`, onPlayButtonClick);

export default welcomeScreen;
