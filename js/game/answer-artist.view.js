import AnswerView from './answer.view';

export default class AnswerArtistView extends AnswerView {
  /**
   * @get
   * @override
   * @type {string}
   */
  get template() {
    return `
      <div class="main-answer-wrapper">
        <input class="main-answer-r" type="radio" id="a${this._answerData.id}" name="answer" value="${this._answerData.id}" />
        <label class="main-answer" for="a${this._answerData.id}">
          <img class="main-answer-preview" src="${this._answerData.content}">
          ${this._answerData.label}
        </label>
      </div>  
    `.trim();
  }
}
