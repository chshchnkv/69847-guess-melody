import WelcomePresenter from './welcome/welcome';
import ResultsPresenter from './results/results';
import GamePresenter from './game/game';

/**
 * @class
 */
class Application {
  /**
   * @function
   * @return {WelcomePresenter}
   */
  static showWelcome() {
    return new WelcomePresenter();
  }

  /**
   * @function
   * @return {GamePresenter}
   */
  static showGame() {
    return new GamePresenter();
  }

  /**
   * @function
   * @param {Results} results
   * @return {ResultsPresenter}
   */
  static showResults(results) {
    return new ResultsPresenter(results);
  }
}

export default Application;
