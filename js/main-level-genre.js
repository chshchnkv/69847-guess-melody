import getElementFromTemplate from './templates';

const levelTemplate = `
<section class="main main--level main--level-genre">
  <h2 class="title"></h2>
  <form class="genre">
    <button class="genre-answer-send" type="submit" disabled>Ответить</button>
  </form>
</section>`;

/**
 *
 * @param {string} id
 * @param {Answer} data
 * @return {DocumentFragment}
 */
const answerGenre = (id, data) => {
  return getElementFromTemplate(`\
    <div class="genre-answer">
      <div class="player-wrapper"><!--TODO: data.content--></div>
      <input type="checkbox" name="answer" value="${id}" id="${id}">
      <label class="genre-answer-check" for="${id}"></label>
    </div>  
  `);
};

/**
 * @param {Question} question
 * @return {DocumentFragment}
 */
export default (question) => {
  const levelFragment = getElementFromTemplate(levelTemplate);
  const genreForm = levelFragment.querySelector(`.genre`);
  const submitBtn = genreForm.querySelector(`.genre-answer-send`);

  Object.keys(question.answers).forEach((key) => {
    genreForm.insertBefore(answerGenre(key, question.answers[key]), submitBtn);
  });

  genreForm.addEventListener(`change`, (event) => {
    event.preventDefault();
    event.stopPropagation();
    submitBtn.disabled = genreForm.querySelectorAll(`.genre-answer input:checked`).length <= 0;
  });

  submitBtn.addEventListener(`click`, (event) => {
    event.preventDefault();
    event.stopPropagation();
    let answerEvent = new CustomEvent(`answer`, {bubbles: true, cancelable: false, detail: [...genreForm.querySelectorAll(`.genre-answer input:checked`)].map((input) => {
      return input.id;
    })});
    genreForm.dispatchEvent(answerEvent);
  });
  return levelFragment;
};
