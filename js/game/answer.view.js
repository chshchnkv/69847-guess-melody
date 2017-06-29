import AbstractView from '../abstract-view';

export default class AnswerView extends AbstractView {

  /**
   * @constructor
   * @param {Answer} answerData
   */
  constructor(answerData) {
    super();
    this._answerData = answerData;
    this._answerIsChosen = false;
  }

  /**
   * @get
   * @type {boolean}
   */
  get isChosen() {
    return this._answerIsChosen;
  }

  /**
   * @function
   * @override
   */
  bind() {
    this.element.addEventListener(`change`, (event) => {
      event.preventDefault();
      event.stopPropagation();
      this._answerIsChosen = this.element.querySelector(`input`).checked;
      this.onAnswer(this._answerData);
    });
  }

  /**
   * @function
   */
  stopPlayback() {}

  /**
   * @function
   * @param {Answer} answerData
   * @abstract
   */
  onAnswer(answerData) {}
}
