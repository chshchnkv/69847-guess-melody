import getElementFromTemplate from './templates';
import showScreen from './show-screen';
import resultsScreen from './main-results';

const element = getElementFromTemplate(`\
  <section class="main main--level main--level-genre">
    <h2 class="title">Выберите инди-рок треки</h2>
    <form class="genre">
      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-1">
        <label class="genre-answer-check" for="a-1"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-2">
        <label class="genre-answer-check" for="a-2"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-3">
        <label class="genre-answer-check" for="a-3"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-4">
        <label class="genre-answer-check" for="a-4"></label>
      </div>

      <button class="genre-answer-send" type="submit" disabled>Ответить</button>
    </form>
  </section>`);

const genreForm = element.querySelector(`.genre`);
const submitBtn = element.querySelector(`.genre-answer-send`);
const onGenreAnswerChange = () => {
  submitBtn.disabled = false;
};
genreForm.addEventListener(`change`, onGenreAnswerChange);

const onSubmit = (event) => {
  event.preventDefault();
  showScreen(resultsScreen);
};
genreForm.addEventListener(`submit`, onSubmit);

export default element;
