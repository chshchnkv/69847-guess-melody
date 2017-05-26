import getElementFromTemplate from './templates';
import showScreen from './show-screen';
import welcomeScreen from './main-welcome';

const winElement = getElementFromTemplate(`\
  <!-- Результат игры -->
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;2&nbsp;минуты<br>вы&nbsp;отгадали 4&nbsp;мелодии</div>
    <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`);

const failElement = getElementFromTemplate(`\
  <!-- Неудачный результат игры -->
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы проиграли</h2>
    <div class="main-stat">Ничего, вам повезет в следующий раз</div>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>
`);

const returnElement = Math.trunc(Math.random() * 100) % 2 === 0 ? winElement : failElement;
const replayElement = returnElement.querySelector(`.main-replay`);
const onReplayClick = (event) => {
  event.preventDefault();
  showScreen(welcomeScreen);
};
replayElement.addEventListener(`click`, onReplayClick);

export default returnElement;
