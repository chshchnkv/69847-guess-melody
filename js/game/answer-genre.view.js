import AnswerView from './answer.view';
import initializePlayer from '../player';

export default class AnswerGenreView extends AnswerView {
  /**
   * @get
   * @override
   * @type {string}
   */
  get template() {
    return `
      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="${this._answerData.id}" id="a${this._answerData.id}">
        <label class="genre-answer-check" for="a${this._answerData.id}"></label>
      </div>  
    `.trim();
  }

  /**
   * @function
   * @override
   */
  render() {
    const element = super.render();
    this._destroyPlayer = initializePlayer(element.querySelector(`.player-wrapper`), this._answerData.content);
    return element;
  }

  /**
   * @function
   * @override
   */
  stopPlayback() {
    if (this._destroyPlayer && typeof this._destroyPlayer === `function`) {
      this._destroyPlayer();
    }
  }
}
