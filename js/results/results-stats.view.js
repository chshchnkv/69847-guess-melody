import ResultsView from './results.view';
import createElement from '../templates';
import getPluralString from '../plural';

const addLeadingZero = (val) => val < 10 ? `0${val}` : val;
const getDateString = (date) => new Date(date).toLocaleDateString();
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
export default class StatsView extends ResultsView {
  /**
   * @get
   * @override
   * @type {string}
   */
  get template() {
    return `
      <section class="main main--result">
        <h2 class="title">Вы настоящий меломан!</h2>
        <div class="main-stat">Последние результаты:</div>
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>
    `.trim();
  }

  render() {
    const resultsScreen = super.render();
    const replayButton = resultsScreen.querySelector(`.main-replay`);
    for (let result of this._results) {
      const resultTime = getTimeString(result.time);
      const resultElement = createElement(`
        <div class="main-stat-item">${getDateString(result.date)}: вы дали ${result.answers} ${getPluralString(result.answers, `правильных ответов`, `правильных ответа`, `правильный ответ`)} за ${resultTime.minutes}:${resultTime.seconds}</div>
      `);
      resultsScreen.insertBefore(resultElement, replayButton);
    }
    return resultsScreen;
  }
}
