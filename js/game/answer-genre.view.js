import AnswerView from './answer.view';

export default class AnswerGenreView extends AnswerView {
  /**
   * @get
   * @override
   * @type {string}
   */
  get template() {
    return `
      <div class="genre-answer">
        <div class="player-wrapper"><!--TODO: data.content--></div>
        <input type="checkbox" name="answer" value="${this._answerData.id}" id="a${this._answerData.id}">
        <label class="genre-answer-check" for="a${this._answerData.id}"></label>
      </div>  
    `.trim();
  }
}
