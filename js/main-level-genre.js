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
 * @param {Answer} data
 * @return {DocumentFragment}
 */
const answerGenre = (data) => {
  return getElementFromTemplate(`\
    <div class="genre-answer">
      <div class="player-wrapper"><!--TODO: data.content--></div>
      <input type="checkbox" name="answer" value="${data.id}" id="a${data.id}">
      <label class="genre-answer-check" for="a${data.id}"></label>
    </div>  
  `);
};

/**
 * @param {Question} question
 * @return {DocumentFragment}
 */
export default (question) => {
  const levelFragment = getElementFromTemplate(levelTemplate);
  levelFragment.querySelector(`.title`).innerText = question.label;
  const genreForm = levelFragment.querySelector(`.genre`);
  const submitBtn = genreForm.querySelector(`.genre-answer-send`);

  question.answers.forEach((answer) => {
    genreForm.insertBefore(answerGenre(answer), submitBtn);
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
      return question.answers[input.value];
    })});
    genreForm.dispatchEvent(answerEvent);
  });
  return levelFragment;
};
