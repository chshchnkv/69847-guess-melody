import getElementFromTemplate from './templates';
import artistScreen from './main-level-artist';
import showScreen from './show-screen';

const welcomeScreen = getElementFromTemplate(`\
  <section class="main main--welcome">
    <section class="logo" title="Угадай мелодию">
      <h1>Угадай мелодию</h1>
    </section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;2 минуты дать
      максимальное количество правильных ответов.<br>
      Удачи!
    </p>
  </section>`);

const playButtonElement = welcomeScreen.querySelector(`.main-play`);
const onPlayButtonClick = (event) => {
  event.preventDefault();
  showScreen(artistScreen);
};

playButtonElement.addEventListener(`click`, onPlayButtonClick);

export default welcomeScreen;
