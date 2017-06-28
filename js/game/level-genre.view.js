import LevelView from './level.view';
import AnswerGenreView from './answer-genre.view';

export default class LevelGenreView extends LevelView {
  /**
   * @get
   * @override
   * @type {string}
   */
  get template() {
    return `
      <section class="main main--level main--level-genre">
        <div class="main-wrap">
          <h2 class="title"></h2>
          <form class="genre">
            <button class="genre-answer-send" type="submit" disabled>Ответить</button>
          </form>
        </div>
      </section>
    `.trim();
  }

  /**
   * @get
   * @type {AnswerView[]}
   */
  get checkedAnswers() {
    return this.answerViews.filter((answerView) => answerView.isChosen);
  }

  /**
   * @get
   * @type {Answer[]}
   */
  get checkedAnswersData() {
    return this.checkedAnswers.map((answerView) => answerView._answerData);
  }

  /**
   * @function
   * @override
   * @return {HTMLElement}
   */
  render() {
    const element = super.render();
    element.querySelector(`.title`).innerText = this.question.label;
    const genreForm = element.querySelector(`.genre`);
    const submitBtn = genreForm.querySelector(`.genre-answer-send`);

    this.question.answers.forEach((answerData) => {
      const answerView = new AnswerGenreView(answerData);
      answerView.onAnswer = () => {
        submitBtn.disabled = this.checkedAnswers.length <= 0;
      };
      this.answerViews.push(answerView);
      genreForm.insertBefore(answerView.element, submitBtn);
    });

    submitBtn.addEventListener(`click`, (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.onAnswer(this.checkedAnswersData);
    });
    return element;
  }
}
