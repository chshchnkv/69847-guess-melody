import {getLevelQuestion} from '../data';
import {getInitialState, applyAnswer, tick, RESULTS_LEVEL} from './state';
import LevelGenreView from './level-genre.view';
import LevelArtistView from './level-artist.view';
import changeView from '../change-view';
import Application from '../application';

class GamePresenter {
  /**
   * @constructor
   * @param {State} [state = getInitialState]
   */
  constructor(state = getInitialState()) {
    this.state = state;
    this._tickInterval = setInterval(() => {
      this.state = tick(this.state);
      if (this.isFinished) {
        this.finishGame();
      }
    }, 1000);
    this.changeState(this.state);
  }

  /**
   * @get
   * @return {boolean}
   */
  get isFinished() {
    return this.state.level === RESULTS_LEVEL;
  }

  /**
   * @function
   */
  finishGame() {
    clearInterval(this._tickInterval);
    Application.showResults({answers: this.state.answers, percent: 60});
  }

  /**
   * Показ нужной вьюхи в зависимости от состояния игры
   * @function
   * @override
   * @param {State} state
   */
  changeState(state) {
    this.state = state;

    const question = getLevelQuestion(this.state.level);
    if (question) {
      this.view = question.type === `artist` ? new LevelArtistView(question) : new LevelGenreView(question);

      this.view.onAnswer = (answers) => {
        this.changeState(applyAnswer(this.state, question, answers));
      };

      changeView(this.view);
    } else {
      this.finishGame();
    }
  }
}
export default GamePresenter;
