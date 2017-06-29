import AbstractView from '../abstract-view';

class LevelView extends AbstractView {
  /**
   * @constructor
   * @param {Question} question
   * @param {HTMLElement} timerView
   */
  constructor(question, timerView) {
    super();
    this.timerView = timerView;
    /**
     * @type {Question}
     */
    this.question = question;
    /**
     * @type {AnswerView[]}
     */
    this.answerViews = [];
  }

  /**
   * @function
   * @param {Answer[]} answers
   */
  onAnswer(answers) {}

  /**
   * @function
   * @override
   * @return {HTMLElement}
   */
  render() {
    const element = super.render();
    element.insertBefore(this.timerView, element.firstElementChild);
    return element;
  }
}

export default LevelView;
