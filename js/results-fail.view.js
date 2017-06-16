import ResultsView from './results.view';

/**
 * @class
 * @extends ResultsView
 */
class FailView extends ResultsView {
  /**
   * @get
   * @override
   * @type {string}
   */
  get template() {
    return `
      <section class="main main--result">
        <h2 class="title">Вы проиграли</h2>
        <div class="main-stat">Ничего, вам повезет в следующий раз</div>
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>
    `.trim();
  }
}

export default FailView;
