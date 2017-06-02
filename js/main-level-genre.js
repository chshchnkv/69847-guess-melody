import getElementFromTemplate from './templates';
import showScreen from './show-screen';
import answerTemplate from './main-answer-genre';
import resultsScreen from './main-results';

const levelFragment = getElementFromTemplate(`\
  <section class="main main--level main--level-genre">
    <h2 class="title">Выберите инди-рок треки</h2>
    <form class="genre">
      <button class="genre-answer-send" type="submit" disabled>Ответить</button>
    </form>
  </section>`);

const genreForm = levelFragment.querySelector(`.genre`);
const submitBtn = levelFragment.querySelector(`.genre-answer-send`);

genreForm.insertBefore(answerTemplate(`a-1`, `answer-1`), submitBtn);
genreForm.insertBefore(answerTemplate(`a-2`, `answer-2`), submitBtn);
genreForm.insertBefore(answerTemplate(`a-3`, `answer-3`), submitBtn);
genreForm.insertBefore(answerTemplate(`a-4`, `answer-4`), submitBtn);

const onGenreAnswerChange = () => {
  submitBtn.disabled = false;
};
genreForm.addEventListener(`change`, onGenreAnswerChange);

const onSubmit = (event) => {
  event.preventDefault();
  showScreen(resultsScreen);
};
genreForm.addEventListener(`submit`, onSubmit);

export default levelFragment;
