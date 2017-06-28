import ResultsView from './results.view';
import getPluralString from '../plural';

const addLeadingZero = (val) => val < 10 ? `0${val}` : val;
const getTimeString = (time) => {
  return {
    minutes: `${addLeadingZero(Math.trunc(time / 60))}`,
    seconds: `${addLeadingZero(time % 60)}`
  };
};

/**
 * @class
 * @extends ResultsView
 */
export default class WinView extends ResultsView {
  /**
   * @get
   * @override
   * @type {string}
   */
  get template() {
    const resultTime = getTimeString(this._results.time);
    return `
      <section class="main main--result">
        <h2 class="title">Вы настоящий меломан!</h2>
        <div class="main-stat">Вы заработали ${this._results.score}&nbsp;${getPluralString(this._results.score, `баллов`, `балла`, `балл`)},<br>отгадав ${this._results.answers}&nbsp;${getPluralString(this._results.answers, `мелодий`, `мелодии`, `мелодию`)} за&nbsp;${resultTime.minutes}:${resultTime.seconds}</div>
        <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${this._results.percent}%&nbsp;игроков</span>
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>
    `.trim();
  }
}
