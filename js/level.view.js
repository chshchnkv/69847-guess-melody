import AbstractView from './abstract-view';

class LevelView extends AbstractView {
  /**
   * @constructor
   * @param {Question} question
   */
  constructor(question) {
    super();
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
}

export default LevelView;
