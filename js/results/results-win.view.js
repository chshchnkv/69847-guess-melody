import ResultsView from './results.view';
import {MAX_TIME_MINS} from '../game/state';

/**
 * @class
 * @extends ResultsView
 */
class WinView extends ResultsView {
  /**
   * @get
   * @override
   * @type {string}
   */
  get template() {
    return `
      <section class="main main--result">
        <h2 class="title">Вы настоящий меломан!</h2>
        <div class="main-stat">За&nbsp;${MAX_TIME_MINS}&nbsp;минуты<br>вы&nbsp;отгадали ${this._results.answers}&nbsp;мелодии</div>
        <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${this._results.percent}%&nbsp;игроков</span>
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>
    `.trim();
  }
}

export default WinView;
